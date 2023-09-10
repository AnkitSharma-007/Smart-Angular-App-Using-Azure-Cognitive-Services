import { Component, OnDestroy, OnInit } from '@angular/core';
import { AvailableLanguage } from '../models/available-language';
import { OcrResult } from '../models/ocr-result';
import { ComputerVisionService } from '../services/computer-vision.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
})
export class OcrComponent implements OnInit, OnDestroy {
  loading = false;
  imageFile: any;
  imagePreview: any;
  imageData = new FormData();
  availableLanguage: AvailableLanguage[] = [];
  DetectedTextLanguage: string = '';
  ocrResult: OcrResult;
  DefaultStatus: string;
  status: string;
  maxFileSize: number;
  isValidFile = true;
  private unsubscribe$ = new ReplaySubject<void>(1);

  constructor(private readonly computerVisionService: ComputerVisionService) {
    this.DefaultStatus = 'Maximum size allowed for the image is 4 MB';
    this.status = this.DefaultStatus;
    this.maxFileSize = 4 * 1024 * 1024; // 4MB
    this.ocrResult = new OcrResult();
  }

  ngOnInit(): void {
    this.computerVisionService
      .getAvailableLanguage()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.availableLanguage = result;
        },
      });
  }

  uploadImage(event: any): void {
    this.imageFile = event.target.files[0];
    if (this.imageFile.size > this.maxFileSize) {
      this.status = `The file size is ${this.imageFile.size} bytes, this is more than the allowed limit of ${this.maxFileSize} bytes.`;
      this.isValidFile = false;
    } else if (this.imageFile.type.indexOf('image') == -1) {
      this.status = 'Please upload a valid image file';
      this.isValidFile = false;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      this.status = this.DefaultStatus;
      this.isValidFile = true;
    }
  }

  getText(): void {
    if (this.isValidFile) {
      this.loading = true;
      this.imageData.append('imageFile', this.imageFile);

      this.computerVisionService
        .getTextFromImage(this.imageData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((result) => {
          this.ocrResult = result;
          const availableLanguageDetails = this.availableLanguage.find(
            (language) => language.languageID === this.ocrResult.language
          );

          if (availableLanguageDetails) {
            this.DetectedTextLanguage = availableLanguageDetails.languageName;
          } else {
            this.DetectedTextLanguage = 'unknown';
          }

          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
