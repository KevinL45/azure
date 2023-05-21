import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;

  constructor(private apiService: ApiService) { }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    }
  }

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
}
