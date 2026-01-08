import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AboutService, About } from '../../../../core/services/about.service';

@Component({
  selector: 'app-admin-about',
  standalone: false,
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.css'],
})
export class AdminAboutComponent implements OnInit {
  aboutForm: FormGroup;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;

  constructor(private fb: FormBuilder, private aboutService: AboutService) {
    this.aboutForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      highlights: this.fb.array([]),
    });
  }

  get highlights(): FormArray {
    return this.aboutForm.get('highlights') as FormArray;
  }

  ngOnInit(): void {
    this.loadAbout();
  }

  loadAbout(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        if (data && data.title) {
          this.aboutForm.patchValue({
            title: data.title,
            description: data.description,
          });
          if (data.highlights) {
            this.highlights.clear();
            data.highlights.forEach((h) => this.addHighlight(h));
          }
        }
      },
      error: (err) => console.error('Error loading about:', err),
    });
  }

  addHighlight(value = ''): void {
    this.highlights.push(this.fb.control(value));
  }

  removeHighlight(index: number): void {
    this.highlights.removeAt(index);
  }

  onSubmit(): void {
    if (this.aboutForm.invalid) return;

    this.isLoading = true;
    const aboutData: About = {
      title: this.aboutForm.value.title,
      description: this.aboutForm.value.description,
      highlights: this.aboutForm.value.highlights.filter((h: string) => h.trim()),
    };

    this.aboutService.updateAbout(aboutData).subscribe({
      next: () => {
        this.showMessage('About section updated successfully!', 'success');
        this.isLoading = false;
      },
      error: (err) => {
        this.showMessage('Error updating about section', 'error');
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 3000);
  }
}
