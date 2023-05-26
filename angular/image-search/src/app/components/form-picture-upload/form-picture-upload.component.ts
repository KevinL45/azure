import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { StorageApiService } from 'src/app/storage-api.service';

@Component({
  standalone: true,
  selector: 'app-form-picture-upload',
  templateUrl: './form-picture-upload.component.html',
  styleUrls: ['./form-picture-upload.component.css'],
  imports: [MatChipsModule, MatSelectModule, ReactiveFormsModule, MatIconModule]
})
export class FormPictureUploadComponent {
  tags_to_add: string[]= []

  pictureUploadForm = this.formBuilder.group({
    tags: [],
    picture: File
  });

  tags: any[] =[]

  constructor(private formBuilder: FormBuilder, private storageApiService: StorageApiService) {

  }

  ngOnInit() {

    this.tags = [
      {id: 1, value: 'steak-0'},
      {id: 2, value: 'steak-2'},
      {id: 3, value: 'steak-3'},
    ];

    this.tags_to_add = []

  }

  onTagSelected(tag_selected: any) {
    console.log(tag_selected)
    let tag_found: any = this.tags_to_add.find(tag_selected)
    // if (tag_found == undefined) {
      this.tags_to_add.push(tag_selected)
    // }
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.pictureUploadForm.value);
    this.pictureUploadForm.reset();
  }

  testApi(): void {
    // this.storageApiService.listFiles()
  }





}
