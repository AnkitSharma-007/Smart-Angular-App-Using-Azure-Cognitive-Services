import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AvailableLanguage } from '../models/availablelanguage';
import { OcrResult } from '../models/ocrresult';

@Injectable({
  providedIn: 'root'
})
export class ComputervisionService {

  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = '/api/OCR';
  }

  getAvailableLanguage(): Observable<AvailableLanguage[]> {
    return this.http.get<AvailableLanguage[]>(this.baseURL);
  }

  getTextFromImage(image: FormData): Observable<OcrResult> {
    return this.http.post<OcrResult>(this.baseURL, image);
  }
}