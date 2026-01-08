import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService, Contact } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-admin-contact',
  standalone: false,
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css'],
})
export class AdminContactComponent implements OnInit {
  contactForm: FormGroup;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      linkedin: [''],
      github: [''],
      twitter: [''],
      facebook: [''],
      instagram: [''],
      website: [''],
    });
  }

  ngOnInit(): void {
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContact().subscribe({
      next: (data) => {
        if (data && data.email) {
          this.contactForm.patchValue(data);
        }
      },
      error: (err) => console.error('Error loading contact:', err),
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.isLoading = true;
    this.contactService.updateContact(this.contactForm.value).subscribe({
      next: () => {
        this.showMessage('Contact information saved successfully!', 'success');
      },
      error: (err) => {
        this.showMessage('Error saving contact information', 'error');
        console.error(err);
      },
    });
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.isLoading = false;
    setTimeout(() => (this.message = ''), 3000);
  }
}
