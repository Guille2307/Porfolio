import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private readonly http = inject(HttpClient);

  getFile(urlFile: string): Observable<Blob> {
    return this.http.get(urlFile, { responseType: 'blob' });
  }
}
