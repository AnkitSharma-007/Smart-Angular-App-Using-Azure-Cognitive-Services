import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { AppComponent } from './app/app.component';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'computer-vision-ocr',
        loadComponent: () =>
          import('./app/ocr/ocr.component').then((m) => m.OcrComponent),
      },
    ]),
  ],
}).catch((err) => console.log(err));
