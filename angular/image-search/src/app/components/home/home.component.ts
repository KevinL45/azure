import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Photo } from '../model/photo';
import { ImageModelComponent } from '../image-model/image-model.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
              '../image-model/image-model.component.css',]
})
export class HomeComponent {
  ten_photos: Photo[] = [];
  random_photos: Photo[] = [];


  constructor(private apiService : ApiService,private router:Router) {

  }

  ngOnInit(): void {
    this.apiService.getTenPhtos().subscribe(photos => {
      this.ten_photos = photos;
    });

    this.apiService.getRandomPhotos().subscribe(photos => {
      this.random_photos = photos;
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
        this.refreshPage()
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
