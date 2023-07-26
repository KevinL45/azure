import { Tag } from './../model/tag';
import { Photo } from './../model/photo';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.css']
})
export class ImageModelComponent {
  title = 'Recherche des images par tags';
  photos: Photo[] = [];
  tags: Tag[]=[];

  constructor(private apiService: ApiService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });


  }

  download(url_image:string,name_image:string):void{
    this.http.get(url_image, { responseType: 'blob' }).subscribe((imageBlob: Blob) => {
      const downloadUrl = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = name_image;
      link.click();
    });
  }

  delete_picture(id:number){
    this.apiService.deleteImage(id)
  }

  }








