import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import { vi } from 'vitest';

import { AppComponent } from './app.component';
import { ImageLoaderService } from './shared/services/image-loader.service';

describe('AppComponent', () => {
  let imageLoader: ImageLoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNoopAnimations(),
        providePrimeNG(),
      ],
    }).compileComponents();

    imageLoader = TestBed.inject(ImageLoaderService);
    vi.spyOn(imageLoader, 'waitForImages').mockResolvedValue(undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the application shell', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('shared-header')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('shared-footer')).toBeTruthy();
  });

  it('should call waitForImages when checkImages() runs for the first time', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    (fixture.componentInstance as any).checkImages();

    expect(imageLoader.waitForImages).toHaveBeenCalledOnce();
  });

  it('should not call waitForImages a second time while already checking', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    (component as any).checkImages(); // first call — sets checking = true
    (component as any).checkImages(); // guarded — should not call again

    expect(imageLoader.waitForImages).toHaveBeenCalledTimes(1);
  });

  it('should set imagesLoaded to true once waitForImages resolves', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    (component as any).checkImages();
    await Promise.resolve(); // flush microtask so .then() runs

    expect(component.imagesLoaded()).toBe(true);
  });

  it('should not call waitForImages if imagesLoaded is already true', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;

    // Force imagesLoaded = true first
    (component as any).checkImages();
    await Promise.resolve();

    vi.mocked(imageLoader.waitForImages).mockClear();
    (component as any).checkImages(); // guard: imagesLoaded() is true → early return

    expect(imageLoader.waitForImages).not.toHaveBeenCalled();
  });

  it('should call checkImages when a NavigationEnd event fires', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // ngAfterViewInit: subscribes to router.events

    const checkSpy = vi.spyOn(fixture.componentInstance as any, 'checkImages');
    const router = TestBed.inject(Router);

    await router.navigate(['/']);

    expect(checkSpy).toHaveBeenCalled();
  });
});
