import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, EnvironmentProviders, Provider, importProvidersFrom} from "@angular/core";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormPictureUploadComponent } from './form-picture-upload/form-picture-upload.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    FormPictureUploadComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule

  ],
  providers: [importProvidersFrom(BrowserAnimationsModule)],
  bootstrap: [AppComponent]
})
export class AppModule { }
