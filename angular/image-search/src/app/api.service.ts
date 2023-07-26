import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError} from "rxjs";
import { environment } from "../environments/environment.development";
import { Photo } from "../app/components/model/photo";
import { Tag } from './components/model/tag';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.example.com'; // Replace with your API URL

  constructor(private httpClient: HttpClient) {
    console.log(environment);
  }

   photo:Photo[]= [];

  uploadImage(files: File[]){
    console.log(files)
    return this.httpClient.post(`${environment.API_URL}upload/pictures/`, files);
  }

  getPhotos(){
    return this.httpClient.get<Photo[]>(`${environment.API_URL}photos/`);
  }

  getTags(){
    return this.httpClient.get<Tag[]>(`${environment.API_URL}tags/`);
  }

  getTag(id:number){
    return this.httpClient.get<Tag>(`${environment.API_URL}tag/${id}`);
  }

  searchImages(criteria: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/images-test?filter=${criteria}`);
  }

  updateImageProperties(image: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/images-test/${image.id}`, image);
  }

  deleteImage(id: number): Observable<any> {
    return this.httpClient.delete<Photo>(`${environment.API_URL}remove_photo/${id}`);
  }
}
