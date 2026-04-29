import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  getFile(urlFile: string): Promise<Response> {
    return fetch(urlFile, {
      method: 'GET',
    });
  }
}
