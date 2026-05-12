import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
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
    const langItem = component.items().find(
      (item) => item.icon === 'pi pi-arrow-right-arrow-left',
    );
    if (!langItem) {
      throw new Error('Language menu item not found');
    }
    langItem.items![0].command!({} as any);
    expect(spy).toHaveBeenCalledWith('es');
  });

  it('language submenu command should call changeLanguage with en', () => {
    const spy = vi.spyOn(component, 'changeLanguage');
    const langItem = component.items().find(
      (item) => item.icon === 'pi pi-arrow-right-arrow-left',
    );
    if (!langItem) {
      throw new Error('Language menu item not found');
    }
    langItem.items![1].command!({} as any);
    expect(spy).toHaveBeenCalledWith('en');
  });

  it('cv menu item command should call openFile', () => {
    const spy = vi.spyOn(component, 'openFile').mockImplementation(() => {});
    const cvItem = component.items().find((item) => item.icon === 'pi pi-download');
    if (!cvItem) {
      throw new Error('CV menu item not found');
    }
    cvItem.command!({} as any);
    expect(spy).toHaveBeenCalled();
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
