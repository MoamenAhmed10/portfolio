import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Education {
  _id?: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  gpa?: string;
  order?: number;
}

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiUrl = `${environment.apiUrl}/education`;

  constructor(private http: HttpClient) {}

  getAllEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  getEducation(id: string): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`);
  }

  createEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.apiUrl, education);
  }

  updateEducation(id: string, education: Education): Observable<Education> {
    return this.http.put<Education>(`${this.apiUrl}/${id}`, education);
  }

  deleteEducation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
