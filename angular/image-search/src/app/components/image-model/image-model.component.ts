import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Photo } from "../model/photo"

@Component({
  selector: 'app-image-model',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.css']
})
export class ImageModelComponent {
  selectedFile: File | null = null;
  title = 'Image Description';
  description!: string;
  photo: Photo[] = [];
  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.getPhoto().subscribe(photos => {
      this.photo = photos;
    });
  }

  // get all Photo:
//   private Photos(response: []): void {
//     this.photos = [];
//     response.forEach((img: ) => {
//         this.images.push(`data:image/png;base64,${img.image}`);
//     });
// }


}
/**

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

  // uploadImage() {
  //   if (this.selectedFile) {
  //     this.apiService.uploadImage(this.selectedFile).subscribe(
  //       response => {
  //         // Handle successful upload
  //         console.log('Image uploaded successfully:', response);
  //         // Reset the selected file
  //         this.selectedFile = null;
  //       },
  //       error => {
  //         // Handle error
  //         console.error('Image upload failed:', error);
  //       }
  //     );
  //   }
  // }
  image:any[]=[];
  uploadImage() {
    if (this.selectedFile) {
      this.apiService.uploadImage(this.selectedFile).subscribe(
        response => {
          // Handle successful upload
          console.log('Image uploaded successfully:', response);
          // Reset the selected file
          this.selectedFile = null;
        },
        error => {
          // Handle error
          console.error('Image upload failed:', error);
        }
      );
    }
  }


  buttonClicked() {
    alert('this is response to button click')
  }
  // refreshList(){
  //   this.HttpClient.get(environment.API_URL+environment.PHOTO_URL)
  //     .subscribe(data=>{
  //     this.image=data;
  //   });
  // }

*/
