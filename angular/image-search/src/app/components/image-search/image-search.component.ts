import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.css']
})
export class ImageSearchComponent {

  recherche:String =""




  // constructor(private apiService: ApiService) { }
  constructor() { }

  onSubmit(): void {

  }

  searchPhoto(): void{
  }

}
