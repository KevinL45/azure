import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPictureUploadComponent } from './form-picture-upload.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';

describe('FormPictureUploadComponent', () => {
  let component: FormPictureUploadComponent;
  let fixture: ComponentFixture<FormPictureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPictureUploadComponent, MatChipsModule, MatSelectModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPictureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
