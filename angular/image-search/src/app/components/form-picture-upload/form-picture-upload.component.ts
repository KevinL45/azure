import { ApiService } from './../../api.service';
import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import {ReactiveFormsModule, FormControl, FormGroup} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { ImageModelComponent } from '../image-model/image-model.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-form-picture-upload',
  templateUrl: './form-picture-upload.component.html',
  styleUrls: ['./form-picture-upload.component.css'],
  imports: [MatChipsModule, MatSelectModule, ReactiveFormsModule, MatIconModule]
})
export class FormPictureUploadComponent {

  files:File[]=[];

  constructor(private apiService: ApiService, private router: Router) {

  }

  ngOnInit() {


  }

  onFileChange(event:any) {
    this.files = event.target.files;
  }

  onSubmit(): void {
    if (this.files.length === 0) {
      console.log('Vide');
      return;
    }else{
    this.apiService.uploadImage(this.files).subscribe({
      next: (response) => {
        console.log("Les photos sont insérés");
          this.refreshPage()
      },
      error: (error) => {
        console.error('Erreur lors de la requête POST : ', error);
      }
    });
    }
  }

  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }





}
