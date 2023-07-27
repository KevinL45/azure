import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageSearchComponent} from "./components/image-search/image-search.component";
import { FormPictureUploadComponent } from './components/form-picture-upload/form-picture-upload.component';
import { HomeComponent} from "./components/home/home.component";
import { ImageModelComponent } from "./components/image-model/image-model.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ImageModelComponent },
  { path: 'search', component: ImageSearchComponent },
  // { path: 'upload', component: ImageUploadComponent },
  { path: 'upload', component: FormPictureUploadComponent },
  { path: 'image_detail', component: ImageModelComponent}
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, {enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
