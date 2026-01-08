import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../core/services/contact.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  contact: any = {};

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contactService.getContact().subscribe({
      next: (data) => (this.contact = data),
      error: (err) => console.error('Error loading contact:', err),
    });
  }
}
