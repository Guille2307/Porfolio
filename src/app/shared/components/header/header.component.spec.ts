import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { HeaderComponent } from './header.component';
import { FilesService } from '../../services/files.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let filesService: FilesService;
  let router: Router;

  beforeEach(async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('en');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    filesService = TestBed.inject(FilesService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load 8 menu items on init', () => {
    expect(component.items().length).toBe(8);
    expect(component.items()[0].items).toBeUndefined();
  });

  it('changeLanguage() should call translate.use with the given language', () => {
    const spy = vi.spyOn(translateService, 'use');
    component.changeLanguage('es');
    expect(spy).toHaveBeenCalledWith('es');
  });

  it('changeLanguage() should save the language to localStorage', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    component.changeLanguage('es');
    expect(spy).toHaveBeenCalledWith('language', 'es');
  });

  it('changeLanguage() should update the language to en', () => {
    const spy = vi.spyOn(translateService, 'use');
    component.changeLanguage('en');
    expect(spy).toHaveBeenCalledWith('en');
  });

  it('openFile() should call filesService.getFile with English CV when lang is en', async () => {
    const mockBlob = new Blob(['pdf'], { type: 'application/pdf' });
    const getFileSpy = vi
      .spyOn(filesService, 'getFile')
      .mockReturnValue(of(mockBlob));
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-en');
    vi.spyOn(window, 'open').mockImplementation(() => null);

    component.changeLanguage('en');
    component.openFile();

    expect(getFileSpy).toHaveBeenCalledWith(
      './assets/Guillermo_Pinate_CV_English.pdf',
    );
  });

  it('openFile() should call filesService.getFile with Spanish CV when lang is es', () => {
    const mockBlob = new Blob(['pdf'], { type: 'application/pdf' });
    const getFileSpy = vi
      .spyOn(filesService, 'getFile')
      .mockReturnValue(of(mockBlob));
    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:mock-es');
    vi.spyOn(window, 'open').mockImplementation(() => null);

    component.changeLanguage('es');
    component.openFile();

    expect(getFileSpy).toHaveBeenCalledWith('./assets/Guillermo_Pinate_Cv.pdf');
  });

  it('menu items should reload when language changes', () => {
    translateService.use('es');
    fixture.detectChanges();
    expect(component.items().length).toBe(8);
    expect(component.items()[0].label).toBeDefined();
    expect(component.items()[1].label).toBeDefined();
  });

  it('language submenu command should call changeLanguage with es', () => {
    const spy = vi.spyOn(component, 'changeLanguage');
    const langItem = component
      .items()
      .find((item) => item.icon === 'pi pi-arrow-right-arrow-left');
    if (!langItem) {
      throw new Error('Language menu item not found');
    }
    langItem.items![0].command!({} as any);
    expect(spy).toHaveBeenCalledWith('es');
  });

  it('language submenu command should call changeLanguage with en', () => {
    const spy = vi.spyOn(component, 'changeLanguage');
    const langItem = component
      .items()
      .find((item) => item.icon === 'pi pi-arrow-right-arrow-left');
    if (!langItem) {
      throw new Error('Language menu item not found');
    }
    langItem.items![1].command!({} as any);
    expect(spy).toHaveBeenCalledWith('en');
  });

  it('cv menu item command should call openFile', () => {
    const spy = vi.spyOn(component, 'openFile').mockImplementation(() => {});
    const cvItem = component
      .items()
      .find((item) => item.icon === 'pi pi-download');
    if (!cvItem) {
      throw new Error('CV menu item not found');
    }
    cvItem.command!({} as any);
    expect(spy).toHaveBeenCalled();
  });

  it('home menu command should call navigateHome', () => {
    const spy = vi
      .spyOn(component, 'navigateHome')
      .mockImplementation(() => {});
    const homeItem = component
      .items()
      .find((item) => item.icon === 'pi pi-home');

    if (!homeItem) {
      throw new Error('Home menu item not found');
    }

    homeItem.command!({} as any);
    expect(spy).toHaveBeenCalled();
  });

  it('section menu commands should call navigateToSection with proper ids', () => {
    const spy = vi
      .spyOn(component, 'navigateToSection')
      .mockImplementation(() => {});
    const expected: Array<[string, string]> = [
      ['pi pi-briefcase', 'experience'],
      ['pi pi-cog', 'technologies'],
      ['pi pi-folder', 'projects'],
      ['pi pi-graduation-cap', 'education'],
    ];

    for (const [icon, sectionId] of expected) {
      const item = component.items().find((menuItem) => menuItem.icon === icon);

      if (!item) {
        throw new Error(`Menu item not found for icon: ${icon}`);
      }

      item.command!({} as any);
      expect(spy).toHaveBeenCalledWith(sectionId);
    }
  });

  it('navigateHome() should smooth scroll when already in home route', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/');
    const scrollSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.navigateHome();

    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('navigateHome() should navigate to home route when not in home', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/contact');
    const navigateSpy = vi
      .spyOn(router, 'navigate')
      .mockResolvedValue(true as any);

    component.navigateHome();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('navigateToSection() should call scroll directly when already in home', () => {
    vi.spyOn(router, 'url', 'get').mockReturnValue('/');
    const scrollSpy = vi
      .spyOn(component as any, 'scrollToSection')
      .mockImplementation(() => {});
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.navigateToSection('experience');

    expect(scrollSpy).toHaveBeenCalledWith('experience', 8);
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('navigateToSection() should not schedule scroll if navigation fails', async () => {
    vi.useFakeTimers();
    vi.spyOn(router, 'url', 'get').mockReturnValue('/contact');
    vi.spyOn(router, 'navigate').mockResolvedValue(false as any);
    const timerSpy = vi.spyOn(globalThis, 'setTimeout');
    const scrollSpy = vi
      .spyOn(component as any, 'scrollToSection')
      .mockImplementation(() => {});

    component.navigateToSection('projects');
    await Promise.resolve();

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(timerSpy).not.toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('navigateToSection() should schedule and perform scroll after successful navigation', async () => {
    vi.useFakeTimers();
    vi.spyOn(router, 'url', 'get').mockReturnValue('/contact');
    vi.spyOn(router, 'navigate').mockResolvedValue(true as any);
    const scrollSpy = vi
      .spyOn(component as any, 'scrollToSection')
      .mockImplementation(() => {});

    component.navigateToSection('technologies');
    await Promise.resolve();
    vi.runAllTimers();

    expect(scrollSpy).toHaveBeenCalledWith('technologies', 8);
    vi.useRealTimers();
  });

  it('scrollToSection() should scroll into view when section exists', () => {
    const sectionElement = {
      scrollIntoView: vi.fn(),
    } as unknown as HTMLElement;
    vi.spyOn(document, 'getElementById').mockReturnValue(sectionElement);

    (component as any).scrollToSection('experience', 3);

    expect(sectionElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('scrollToSection() should stop when retries are exhausted', () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null);
    const timerSpy = vi.spyOn(globalThis, 'setTimeout');

    (component as any).scrollToSection('missing', 0);

    expect(timerSpy).not.toHaveBeenCalled();
  });

  it('scrollToSection() should retry with decremented counter when section is missing', () => {
    vi.useFakeTimers();
    vi.spyOn(document, 'getElementById').mockReturnValue(null);
    const timeoutSpy = vi
      .spyOn(globalThis, 'setTimeout')
      .mockImplementation((handler: TimerHandler) => {
        if (typeof handler === 'function') {
          handler();
        }

        return 0 as any;
      });

    (component as any).scrollToSection('missing', 2);

    expect(timeoutSpy).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith('missing');
    expect((document.getElementById as any).mock.calls.length).toBeGreaterThan(
      1,
    );
    vi.useRealTimers();
  });

  it('openFile() should handle errors via console.error', () => {
    vi.spyOn(filesService, 'getFile').mockReturnValue(
      throwError(() => new Error('Network error')),
    );
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.openFile();

    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('HeaderComponent — SSR (non-browser environment)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('en');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => vi.restoreAllMocks());

  it('openFile() should return early without calling filesService when not in browser', () => {
    const filesService = TestBed.inject(FilesService);
    const spy = vi.spyOn(filesService, 'getFile');

    component.openFile();

    expect(spy).not.toHaveBeenCalled();
  });

  it('scrollToSection() should return early without querying DOM when not in browser', () => {
    const getElementSpy = vi.spyOn(document, 'getElementById');

    (component as any).scrollToSection('experience', 3);

    expect(getElementSpy).not.toHaveBeenCalled();
  });
});
