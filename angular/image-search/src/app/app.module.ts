import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { FormsModule } from "@angular/forms";
// import { FormPictureUploadComponent } from './components/form-picture-upload/form-picture-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    ImageSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    // FormPictureUploadComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
