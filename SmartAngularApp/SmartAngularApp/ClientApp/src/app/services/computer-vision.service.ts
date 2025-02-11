import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ComputerVisionService {
  baseURL = '/api/OCR';

  constructor(private readonly http: HttpClient) {}

  getTextFromImage(image: FormData) {
    return this.http.post<string>(this.baseURL, image);
  }
}
