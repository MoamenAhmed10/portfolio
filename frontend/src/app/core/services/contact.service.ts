import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Contact {
  _id?: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  website?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contact`;

  constructor(private http: HttpClient) {}

  getContact(): Observable<Contact> {
    return this.http.get<Contact>(this.apiUrl);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  deleteContact(): Observable<any> {
    return this.http.delete(this.apiUrl);
  }
}
