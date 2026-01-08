import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface About {
  _id?: string;
  title: string;
  description: string;
  highlights?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = `${environment.apiUrl}/about`;

  constructor(private http: HttpClient) {}

  getAbout(): Observable<About> {
    return this.http.get<About>(this.apiUrl);
  }

  updateAbout(about: About): Observable<About> {
    return this.http.post<About>(this.apiUrl, about);
  }

  deleteAbout(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
