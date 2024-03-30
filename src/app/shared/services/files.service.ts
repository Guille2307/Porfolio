import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor() {}

  getFile(urlFile: string): Promise<any> {
    return fetch(urlFile, {
      method: 'GET',
    });
  }
}
