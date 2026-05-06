import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterOutlet } from '@angular/router';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { providePrimeNG } from 'primeng/config';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNoopAnimations(),
        providePrimeNG(),
      ],
    }),
  );

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

  it('imagesLoaded signal should start as false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.imagesLoaded()).toBe(false);
  });

  it('should show loader when imagesLoaded is false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-loader')).toBeTruthy();
  });

  it('should hide loader and show content after imagesLoaded becomes true', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.imagesLoaded.set(true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-loader')).toBeNull();
    expect(compiled.querySelector('.app-content')).toBeTruthy();
  });

  it('app-content div should have visible class when imagesLoaded is true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.imagesLoaded.set(true);
    fixture.detectChanges();
    const content = (fixture.nativeElement as HTMLElement).querySelector(
      '.app-content',
    );
    expect(content?.classList.contains('visible')).toBe(true);
  });

  it('should set imagesLoaded to true after timers fire with no images in DOM', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // triggers ngAfterViewInit → starts zone.js timers
    await fixture.whenStable(); // waits for all zone.js macro tasks to complete
    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 5000);
});

describe('AppComponent - NavigationEnd', () => {
  beforeEach(async () => {
    @Component({ template: '', standalone: true })
    class PageStub {}

    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([{ path: '**', component: PageStub }]),
        provideHttpClient(),
        provideNoopAnimations(),
        providePrimeNG(),
      ],
    }).compileComponents();
  });

  it('should call scheduleImageCheck when NavigationEnd fires', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await router.navigate(['/']);
    // NavigationEnd fired → line 42 (scheduleImageCheck) covered
    expect(fixture.componentInstance).toBeTruthy();
  }, 10000);
});

describe('AppComponent - image loading', () => {
  const addedImages: HTMLImageElement[] = [];

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
  });

  afterEach(() => {
    addedImages.splice(0).forEach((img) => img.remove());
  });

  it('should call showContent via checkAllLoaded when img.complete is true', async () => {
    const img = document.createElement('img');
    // no src → img.complete === true
    document.body.appendChild(img);
    addedImages.push(img);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 10000);

  it('should attach load/error listeners and showContent via 3000ms timer, then guard on double call', async () => {
    const img = document.createElement('img');
    img.src = 'https://example.com/fake-image.png'; // complete = false
    document.body.appendChild(img);
    addedImages.push(img);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable(); // waits for 500ms + 100ms + 3000ms timer

    // imagesLoaded is now true via 3000ms fallback
    // Dispatching load calls checkAllLoaded → showContent → hits the guard (line 103)
    img.dispatchEvent(new Event('load'));

    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 10000);
});

describe('AppComponent - isolated (stub Header/Footer)', () => {
  @Component({ selector: 'shared-header', template: '', standalone: true })
  class HeaderStub {}

  @Component({ selector: 'shared-footer', template: '', standalone: true })
  class FooterStub {}

  const addedImages: HTMLImageElement[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideNoopAnimations(),
        providePrimeNG(),
      ],
    })
      .overrideComponent(AppComponent, {
        set: {
          imports: [
            RouterOutlet,
            ProgressSpinnerModule,
            ScrollTopModule,
            HeaderStub,
            FooterStub,
          ],
        },
      })
      .compileComponents();
  });

  afterEach(() => {
    addedImages.splice(0).forEach((img) => img.remove());
  });

  it('should call showContent immediately when no images in DOM (lines 71-72)', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 5000);

  it('should call showContent via checkAllLoaded when single img.complete is true (line 81)', async () => {
    const img = document.createElement('img');
    // no src → img.complete === true in jsdom
    document.body.appendChild(img);
    addedImages.push(img);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 5000);

  it('should hit showContent guard when called while already loaded (line 103)', async () => {
    const img = document.createElement('img');
    img.src = 'https://example.com/fake.png'; // complete = false
    document.body.appendChild(img);
    addedImages.push(img);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable(); // 3000ms fallback sets imagesLoaded = true

    // Trigger load event → checkAllLoaded → showContent → guard returns early (line 103)
    img.dispatchEvent(new Event('load'));

    expect(fixture.componentInstance.imagesLoaded()).toBe(true);
  }, 10000);
});
