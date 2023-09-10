import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableLanguage } from '../models/available-language';
import { OcrResult } from '../models/ocr-result';

@Injectable({
  providedIn: 'root',
})
export class ComputerVisionService {
  baseURL = '/api/OCR';

  constructor(private readonly http: HttpClient) {}

  getAvailableLanguage(): Observable<AvailableLanguage[]> {
    return this.http.get<AvailableLanguage[]>(this.baseURL);
  }

  getTextFromImage(image: FormData): Observable<OcrResult> {
    return this.http.post<OcrResult>(this.baseURL, image);
  }
}
