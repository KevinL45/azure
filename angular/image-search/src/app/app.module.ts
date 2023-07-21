import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageModelComponent } from './components/image-model/image-model.component';
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { FormsModule } from "@angular/forms";
import { FormPictureUploadComponent } from './components/form-picture-upload/form-picture-upload.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { environment } from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    ImageModelComponent,
    ImageSearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FormPictureUploadComponent,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
