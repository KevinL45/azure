import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImageSearchComponent} from "./components/image-search/image-search.component";
import {ImageUploadComponent} from "./components/image-upload/image-upload.component";

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: ImageSearchComponent },
  { path: 'upload', component: ImageUploadComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
