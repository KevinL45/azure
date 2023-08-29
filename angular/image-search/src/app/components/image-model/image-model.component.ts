import { Tag } from './../model/tag';
import { Photo } from './../model/photo';
import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.css']
})
export class ImageModelComponent {
  photos: Photo[] = [];

  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });


  }

  download(url_image:string, name_image:string):void{
    const link = document.createElement('a');
    link.href = this.apiService.constructDownloadImageURI(name_image);
    link.download = ` ${name_image}.jpeg`;
    link.click();
  }

  delete_picture(id:number){
    console.log("L'id de la photo :"+ id)
    this.apiService.deletePhoto(id).subscribe({
      next: (response) => {
        console.log('Photo supprimé');
        //this.refreshPage()
      },
      error: (error) => {
        console.error('Erreur lors de la requête DELETE : ', error);
      }
    });
  }


  refreshPage() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}

  }








