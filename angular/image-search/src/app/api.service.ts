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


  constructor(private httpClient: HttpClient) {
    console.log(environment);
  }

   photo:Photo[]= [];

  uploadImage(files: File[]){
    const formData = new FormData();
    for (const image of files) {
      formData.append('files', image);
    }
    console.log(formData.getAll("files"))

    return this.httpClient.post<any>(`${environment.API_URL}upload/pictures/`, formData);
  }

  constructDownloadImageURI(UUID: string): string {
    return `${environment.API_URL}download/pictures/${UUID}`+ "/"
  }

  downloadImage(UUID: string){
    let url = this.constructDownloadImageURI(UUID)
    return this.httpClient.get<Blob>(url);
  }

  getPhotos(){
    return this.httpClient.get<Photo[]>(`${environment.API_URL}photos/`);
  }

  getRandomPhotos(){
    return this.httpClient.get<Photo[]>(`${environment.API_URL}random_photos/`);
  }

  getTenPhtos(){
    return this.httpClient.get<Photo[]>(`${environment.API_URL}ten_photos/`);
  }

  getPhoto(id:number){
    return this.httpClient.get<Photo>(`${environment.API_URL}photo/${id}/`);
  }

  getTags(){
    return this.httpClient.get<Tag[]>(`${environment.API_URL}tags/`);
  }

  getTag(id:number){
    return this.httpClient.get<Tag>(`${environment.API_URL}tag/${id}/`);
  }

  // searchImages(criteria: string): Observable<any> {
  //   return this.httpClient.get(`${this.apiUrl}/images-test?filter=${criteria}`);
  // }

  // updateImageProperties(image: any): Observable<any> {
  //   return this.httpClient.put(`${this.apiUrl}/images-test/${image.id}`, image);
  // }

  deletePhoto(id: number){
    return this.httpClient.delete<Photo>(`${environment.API_URL}remove_photo/${id}/`);
  }
}
