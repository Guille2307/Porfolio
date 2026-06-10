import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ImageLoaderService } from './image-loader.service';

describe('ImageLoaderService', () => {
  let service: ImageLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageLoaderService);
  });

  afterEach(() => {
    document.querySelectorAll('img[data-test]').forEach((img) => img.remove());
    vi.restoreAllMocks();
  });

  const addImg = (complete = false): HTMLImageElement => {
    const img = document.createElement('img');
    img.dataset['test'] = 'true';
    if (!complete) {
      img.src = 'https://example.com/fake.jpg';
    }
    document.body.appendChild(img);
    return img;
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve immediately when there are no images in the DOM', async () => {
    document.querySelectorAll('img').forEach((img) => img.remove());

    await expect(service.waitForImages()).resolves.toBeUndefined();
  });

  it('should resolve immediately when all images are already complete', async () => {
    addImg(true); // no src → complete = true

    await expect(service.waitForImages()).resolves.toBeUndefined();
  });

  it('should resolve when a pending image fires a load event', async () => {
    const img = addImg(false);

    const promise = service.waitForImages();
    img.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBeUndefined();
  });

  it('should resolve when a pending image fires an error event', async () => {
    const img = addImg(false);

    const promise = service.waitForImages();
    img.dispatchEvent(new Event('error'));

    await expect(promise).resolves.toBeUndefined();
  });

  it('should resolve via fallback timeout when images never load', async () => {
    vi.useFakeTimers();
    addImg(false);

    const promise = service.waitForImages(100);
    vi.advanceTimersByTime(100);

    await expect(promise).resolves.toBeUndefined();
    vi.useRealTimers();
  });

  it('should clear the fallback timer once all images have loaded', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const img = addImg(false);

    const promise = service.waitForImages();
    img.dispatchEvent(new Event('load'));
    await promise;

    expect(clearSpy).toHaveBeenCalled();
  });

  it('should resolve only after the last of multiple pending images loads', async () => {
    const img1 = addImg(false);
    const img2 = addImg(false);

    const promise = service.waitForImages();

    img1.dispatchEvent(new Event('load')); // first loaded — should not resolve yet

    let resolved = false;
    promise.then(() => (resolved = true));
    await Promise.resolve(); // flush microtasks
    expect(resolved).toBe(false);

    img2.dispatchEvent(new Event('load')); // last one — now resolves
    await expect(promise).resolves.toBeUndefined();
  });

  it('should handle a mix of complete and pending images', async () => {
    addImg(true);       // already complete
    const pending = addImg(false); // needs to load

    const promise = service.waitForImages();
    pending.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBeUndefined();
  });
});
