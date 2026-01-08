import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Profile {
  _id?: string;
  name: string;
  title: string;
  subtitle?: string;
  photo?: string;
  tagline?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.apiUrl);
  }

  updateProfile(profile: FormData | Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }

  uploadPhoto(photo: File): Observable<Profile> {
    const formData = new FormData();
    formData.append('photo', photo);
    return this.http.post<Profile>(`${this.apiUrl}/photo`, formData);
  }

  deleteProfile(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
