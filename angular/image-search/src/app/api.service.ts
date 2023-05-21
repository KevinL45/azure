import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  uploadImage(imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  searchImages(criteria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?criteria=${criteria}`);
  }

  updateImageProperties(image: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/images/${image.id}`, image);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/images/${imageId}`);
  }
}
