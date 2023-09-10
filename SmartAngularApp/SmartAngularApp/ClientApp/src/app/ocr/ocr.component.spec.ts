import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrComponent } from './ocr.component';

describe('OcrComponent', () => {
  let component: OcrComponent;
  let fixture: ComponentFixture<OcrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcrComponent]
    });
    fixture = TestBed.createComponent(OcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
