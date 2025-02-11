import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComputerVisionService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseURL = '/api/OCR';

  getTextFromImage(image: FormData) {
    return this.httpClient.post<string>(this.baseURL, image);
  }
}
