import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ContactService, Contact } from '../../core/services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe({
      next: (data) => {
        this.contact = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading contact:', err),
    });
  }
}
