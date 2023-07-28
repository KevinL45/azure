import { Component, ElementRef, NgModule, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css'],
})
export class ImageSearchComponent {
  searchCriteria: string = '';
  searchResults: any[] = [];
  available_tags: string[] = []

  ////////////////////////
  separatorKeysCodes: number[] = [0, 1];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  tagsAvailable: string[] = []
  // constructor(private apiService: ApiService) { }
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor(private apiService: ApiService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe(photos => {
      this.tagsAvailable = photos.flatMap(x => x.tags.map(x => x.name))
      console.log(this.tagsAvailable)
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    // this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  ////////////////////////////////

  searchImages() {
    // if (this.searchCriteria.trim() !== '') {
    //   this.apiService.searchImages(this.searchCriteria).subscribe(
    //     response => {
    //       // Handle successful search
    //       console.log('Search results:', response);
    //       this.searchResults = response;
    //     },
    //     error => {
    //       // Handle error
    //       console.error('Search failed:', error);
    //     }
    //   );
    // } else {
    //   this.searchResults = [];
    // }
  }

  updateImageProperties(image: any) {
    // // Call the API service to update the image properties
    // this.apiService.updateImageProperties(image).subscribe(
    //   response => {
    //     // Handle successful update
    //     console.log('Image properties updated:', response);
    //   },
    //   error => {
    //     // Handle error
    //     console.error('Failed to update image properties:', error);
    //   }
    // );
  }

  deleteImage(image: any) {
    // // Call the API service to delete the image
    // this.apiService.deleteImage(image.id).subscribe(
    //   response => {
    //     // Handle successful delete
    //     console.log('Image deleted:', response);
    //     // Remove the deleted image from the search results
    //     this.searchResults = this.searchResults.filter(item => item.id !== image.id);
    //   },
    //   error => {
    //     // Handle error
    //     console.error('Failed to delete image:', error);
    //   }
    // );
  }
}
