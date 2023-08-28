import { Component, ElementRef, NgModule, ViewChild, inject } from '@angular/core';
import { ApiService } from '../../api.service';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Observable, map, startWith } from 'rxjs';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Photo } from '../model/photo';

interface AvailableTag {
  name: string,
  occurence: string
  color?: string
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

  photos: Photo[] = []
  tags_to_search: string[]

  search_mode=['INCLUDE','EXCLUDE']
  search_mode_enabled = false
  search_mode_selected = this.search_mode[0]
  old_search_mode_selected = ""




  ////////////////////////
  separatorKeysCodes: number[] = [0, 1];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  fruits: string[] = [];
  allFruits: string[] = [];
  tagsAvailable: AvailableTag[] = []
  // constructor(private apiService: ApiService) { }
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  constructor(private apiService: ApiService, private router: Router) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
    this.tags_to_search = []
    this.tags_to_search.push(this.search_mode_selected)
    this.fruits = this.tags_to_search
  }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
    this.apiService.getAvailableTags(20).subscribe((availableTags: any) => {
      if (availableTags != null) {
        let availableTagsResults: any = availableTags
        let datas = availableTagsResults['available-tags']
        if (datas != null)  {
          this.available_tags = (datas as AvailableTag[]).map((data: AvailableTag) =>  {
            // data.occurence = parseInt((data.occurence as string))
            data.color = "#" + Math.floor(Math.random()*16777215).toString(16);
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
        this.all_tags = datas.map((data: any) => {
          return data.name
          // data.color = Math.floor(Math.random()*16777215).toString(16);
        })
      }
    })

    this.apiService.getPhotos(this.tags_to_search).subscribe(photos => {
      this.photos = photos;
      // this.ten_photos = (this.ten_photos.map(photo => photo.color = Math.floor(Math.random()*16777215).toString(16)))
    });



    // this.apiService.getPhotos().subscribe(photos => {
    //   this.tagsAvailable = photos.flatMap(x => x.tags.map(x => x.name))
    //   console.log(this.tagsAvailable)
    // });
  }

  onClickChip(tag_name: string, flush: boolean = true): void {
    // this.photos =
    if (flush) {
      console.log("FLUSHHHHHHHHHHH!!!")
      this.tags_to_search = []
    }
    this.tags_to_search.push(tag_name)
    console.log(this.tags_to_search)
    this.fruits = this.tags_to_search
    let fruits_render = []
    fruits_render.push(this.search_mode_selected)
    this.fruits = fruits_render.concat(this.tags_to_search)
    // this.refreshPage()
    this.ngOnInit()
    // this.api
  }



  onClickSlider(event: any): void{
    console.log("click slider")
    this.search_mode_enabled = !this.search_mode_enabled
    this.search_mode_selected = (this.search_mode_enabled == true ? this.search_mode[0]:this.search_mode[1])
    this.fruits[0] = this.search_mode_selected
    // this.renderChip()
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
    this.ngOnInit()
  }

  selected(event: MatAutocompleteSelectedEvent): void {

    // this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    let tag_selected = event.option.viewValue
    console.log(tag_selected)

    this.tags_to_search = this.fruits
    this.fruits.push(event.option.viewValue);
    this.tags_to_search = this.fruits

    this.ngOnInit()
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.all_tags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


  ///////////////////////////////////////////////////


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

  ////////////////////////////////

  // onSubmit(): void {

  // }

  // searchPhoto(): void{
  // }

}
