import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Contact | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'Reach out by email or through social profiles to discuss opportunities, collaborations, or freelance work.',
    });
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
