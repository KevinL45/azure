import { Component, ElementRef, NgModule, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable, map, startWith } from 'rxjs';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';

interface AvailableTag {
  name: string,
  occurence: string
}
@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css'],
})
export class ImageSearchComponent {
  searchCriteria: string = '';
  searchResults: any[] = [];
  available_tags: AvailableTag[] = []
  all_tags: string[] = []

  recherche:String =""




  ////////////////////////
  separatorKeysCodes: number[] = [0, 1];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  tagsAvailable: AvailableTag[] = []
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
    this.apiService.getAvailableTags(20).subscribe((availableTags: any) => {
      if (availableTags != null) {
        let availableTagsResults: any = availableTags
        let datas = availableTagsResults['available-tags']
        if (datas != null)  {
          this.available_tags = (datas as AvailableTag[]).map((data: AvailableTag) =>  {
            // data.occurence = parseInt((data.occurence as string))
            console.log(data)
            return data
          })
       }
        // this.available_tags = test.map((data: any) => data.name)
      }
    })
    this.apiService.getAvailableTags(1000).subscribe((allTags: any) => {
      if (allTags != null) {
        let availableTagsResults: any = allTags;
        let datas = availableTagsResults['available-tags']
        this.all_tags = datas.map((data: any) => data.name)
      }
    })
    // this.apiService.getPhotos().subscribe(photos => {
    //   this.tagsAvailable = photos.flatMap(x => x.tags.map(x => x.name))
    //   console.log(this.tagsAvailable)
    // });
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

  // onSubmit(): void {

  // }

  // searchPhoto(): void{
  // }

}
