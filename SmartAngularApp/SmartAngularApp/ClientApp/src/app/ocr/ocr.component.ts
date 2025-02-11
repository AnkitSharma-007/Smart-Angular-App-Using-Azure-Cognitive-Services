import { Component, inject, OnDestroy } from '@angular/core';
import { ComputerVisionService } from '../services/computer-vision.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
})
export class OcrComponent implements OnDestroy {
  private readonly computerVisionService = inject(ComputerVisionService);

  loading = false;
  imageFile: any;
  imagePreview: any;
  imageData = new FormData();
  ocrResult = '';
  DefaultStatus = 'Maximum size allowed for the image is 4 MB';
  status = '';
  maxFileSize = 4 * 1024 * 1024; // 4MB;
  isValidFile = true;
  private unsubscribe$ = new ReplaySubject<void>(1);

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
          this.loading = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
