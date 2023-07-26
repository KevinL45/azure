import { Tag } from './../model/tag';
import { Photo } from './../model/photo';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'; // Make sure to import the 'map' operator
import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.css']
})
export class ImageModelComponent {
  title = 'Recherche des images par tags';
  photos: Photo[] = [];
  tags: Tag[]=[];

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });

    this.apiService.getTag(1).subscribe(tag=>{
      console.log(tag.name)
    })

  }






}

