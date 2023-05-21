import { Component } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent {
  searchCriteria: string = '';
  searchResults: any[] = [];

  constructor(private apiService: ApiService) { }

  searchImages() {
    if (this.searchCriteria.trim() !== '') {
      this.apiService.searchImages(this.searchCriteria).subscribe(
        response => {
          // Handle successful search
          console.log('Search results:', response);
          this.searchResults = response;
        },
        error => {
          // Handle error
          console.error('Search failed:', error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  updateImageProperties(image: any) {
    // Call the API service to update the image properties
    this.apiService.updateImageProperties(image).subscribe(
      response => {
        // Handle successful update
        console.log('Image properties updated:', response);
      },
      error => {
        // Handle error
        console.error('Failed to update image properties:', error);
      }
    );
  }

  deleteImage(image: any) {
    // Call the API service to delete the image
    this.apiService.deleteImage(image.id).subscribe(
      response => {
        // Handle successful delete
        console.log('Image deleted:', response);
        // Remove the deleted image from the search results
        this.searchResults = this.searchResults.filter(item => item.id !== image.id);
      },
      error => {
        // Handle error
        console.error('Failed to delete image:', error);
      }
    );
  }
}
