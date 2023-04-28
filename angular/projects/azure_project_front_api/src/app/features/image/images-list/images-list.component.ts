import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-images-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.css']
})
export class ImagesListComponent {

}
