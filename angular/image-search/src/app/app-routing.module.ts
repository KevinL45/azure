import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageSearchComponent} from "./components/image-search/image-search.component";
import {ImageUploadComponent} from "./components/image-upload/image-upload.component";
import { FormPictureUploadComponent } from './components/form-picture-upload/form-picture-upload.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: ImageSearchComponent },
  // { path: 'upload', component: ImageUploadComponent },
  { path: 'upload', component: FormPictureUploadComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // imports: [RouterModule.forRoot(routes, {enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
