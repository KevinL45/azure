import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormPictureUploadComponent } from './form-picture-upload/form-picture-upload.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSlideToggleModule,
    FormPictureUploadComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'azure_project_front_api';
}
