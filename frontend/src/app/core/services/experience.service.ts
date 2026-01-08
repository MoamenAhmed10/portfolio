import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  order?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiUrl = `${environment.apiUrl}/experience`;

  constructor(private http: HttpClient) {}

  getAllExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.apiUrl);
  }

  getExperience(id: string): Observable<Experience> {
    return this.http.get<Experience>(`${this.apiUrl}/${id}`);
  }

  createExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.apiUrl, experience);
  }

  updateExperience(id: string, experience: Experience): Observable<Experience> {
    return this.http.put<Experience>(`${this.apiUrl}/${id}`, experience);
  }

  deleteExperience(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
