const CDP = require('chrome-remote-interface');

async function measure(port, url, label) {
  const client = await CDP({ port });
  const { Page, Runtime, Network, Performance } = client;
  await Page.enable(); await Runtime.enable(); await Network.enable();
  await client.Emulation.setDeviceMetricsOverride({ width: 1600, height: 900, deviceScaleFactor: 1, mobile: false });

  const requests = [];
  const responses = [];
  let totalBytes = 0;

  Network.requestWillBeSent((p) => {
    requests.push({ url: p.request.url, type: p.type || p.initiator?.type });
  });
  Network.responseReceived((p) => {
    const size = p.response.encodedDataLength || 0;
    totalBytes += size;
    responses.push({
      url: p.response.url,
      status: p.response.status,
      size,
      type: p.type,
    });
  });
  Network.loadingFinished((p) => {
    const r = responses.find(r => r.url === requests.find(req => req._id === p.requestId)?.url);
  });

  const t0 = Date.now();
  await Page.navigate({ url });
  await Page.loadEventFired();
  const tLoad = Date.now() - t0;

  // Wait for network to be idle
  await new Promise(r => setTimeout(r, 2000));

  const perf = await Runtime.evaluate({
    expression: `JSON.stringify({
      timing: performance.getEntriesByType('navigation')[0] ? {
        domContentLoaded: Math.round(performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd),
        loadEvent: Math.round(performance.getEntriesByType('navigation')[0].loadEventEnd),
      } : null,
      paint: performance.getEntriesByType('paint').map(p => ({ name: p.name, time: Math.round(p.startTime) })),
      resources: performance.getEntriesByType('resource').map(r => ({
        name: r.name.split('/').pop().substring(0, 60),
        type: r.initiatorType,
        size: r.encodedBodySize || r.transferSize,
        duration: Math.round(r.duration),
      })).filter(r => r.size > 0),
      totalTransfer: performance.getEntriesByType('resource').reduce((s, r) => s + (r.encodedBodySize || r.transferSize || 0), 0),
    })`
  });

  const data = JSON.parse(perf.result.value);
  console.log(`\n=== ${label} ===`);
  console.log(`URL: ${url}`);
  console.log(`Total requests: ${requests.length}`);
  console.log(`Total transfer (encoded): ${(data.totalTransfer / 1024).toFixed(2)} kB`);
  console.log(`Navigation timing:`, data.timing);
  console.log(`Paint:`, data.paint);
  console.log(`Top resources by size:`);
  data.resources.sort((a, b) => b.size - a.size).slice(0, 15).forEach(r => {
    console.log(`  ${(r.size / 1024).toFixed(2).padStart(8)} kB  ${r.duration.toString().padStart(5)}ms  ${r.type.padEnd(8)} ${r.name}`);
  });

  await client.close();
  return { requests: requests.length, totalBytes: data.totalTransfer, paint: data.paint, timing: data.timing };
}

(async () => {
  const port = parseInt(process.env.CDP_PORT);
  console.log('Measuring PRODUCTION build (port 4301)...');
  await measure(port, 'http://localhost:4301/', 'PROD');
})().catch(e => { console.error(e); process.exit(1); });
