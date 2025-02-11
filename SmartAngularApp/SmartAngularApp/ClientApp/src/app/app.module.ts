import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { OcrComponent } from './ocr/ocr.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomeComponent, OcrComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'computer-vision-ocr', component: OcrComponent },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
