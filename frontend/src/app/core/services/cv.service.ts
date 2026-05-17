import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface CV {
  _id?: string;
  filename: string;
  originalName: string;
  path: string;
  size?: number;
  createdAt?: string;
  updatedAt?: string;
  uploadedAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private apiUrl = `${environment.apiUrl}/cv`;

  constructor(private http: HttpClient) {}

  getCV(): Observable<CV> {
    return this.http.get<CV>(this.apiUrl);
  }

  uploadCV(file: File): Observable<CV> {
    const formData = new FormData();
    formData.append('cv', file);
    return this.http.post<CV>(this.apiUrl, formData);
  }

  deleteCV(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }

  getDownloadUrl(): string {
    return `${this.apiUrl}/download`;
  }
}
