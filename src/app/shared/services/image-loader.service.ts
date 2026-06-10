import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageLoaderService {
  waitForImages(timeoutMs = 3000): Promise<void> {
    return new Promise((resolve) => {
      const images = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];

      if (images.length === 0) {
        resolve();
        return;
      }

      let loadedCount = 0;
      const fallback = setTimeout(resolve, timeoutMs);

      const check = () => {
        if (++loadedCount >= images.length) {
          clearTimeout(fallback);
          resolve();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          check();
        } else {
          img.addEventListener('load', check, { once: true });
          img.addEventListener('error', check, { once: true });
        }
      });
    });
  }
}
