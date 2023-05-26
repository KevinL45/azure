import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { FormPictureUploadComponent } from '../../../form-picture-upload/form-picture-upload.component';

@Component({
  selector: 'app-images-list',
  standalone: true,
  imports: [
    RouterModule,
    FormPictureUploadComponent
  ],
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent {

}
