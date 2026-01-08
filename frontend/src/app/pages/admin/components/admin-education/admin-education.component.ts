import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducationService, Education } from '../../../../core/services/education.service';

@Component({
  selector: 'app-admin-education',
  standalone: false,
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css'],
})
export class AdminEducationComponent implements OnInit {
  educationForm: FormGroup;
  educationList: Education[] = [];
  editingId: string | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;
  showForm = false;

  constructor(private fb: FormBuilder, private educationService: EducationService) {
    this.educationForm = this.fb.group({
      degree: ['', Validators.required],
      institution: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      description: [''],
      gpa: [''],
      order: [0],
    });
  }

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.educationService.getAllEducation().subscribe({
      next: (data) => (this.educationList = data),
      error: (err) => console.error('Error loading education:', err),
    });
  }

  openForm(education?: Education): void {
    this.showForm = true;
    if (education) {
      this.editingId = education._id || null;
      this.educationForm.patchValue(education);
    } else {
      this.editingId = null;
      this.educationForm.reset({ order: 0 });
    }
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.educationForm.reset({ order: 0 });
  }

  onSubmit(): void {
    if (this.educationForm.invalid) return;

    this.isLoading = true;
    const educationData = this.educationForm.value;

    if (this.editingId) {
      this.educationService.updateEducation(this.editingId, educationData).subscribe({
        next: () => {
          this.showMessage('Education updated successfully!', 'success');
          this.loadEducation();
          this.closeForm();
          this.isLoading = false;
        },
        error: (err) => {
          this.showMessage('Error updating education', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    } else {
      this.educationService.createEducation(educationData).subscribe({
        next: () => {
          this.showMessage('Education added successfully!', 'success');
          this.loadEducation();
          this.closeForm();
          this.isLoading = false;
        },
        error: (err) => {
          this.showMessage('Error adding education', 'error');
          console.error(err);
          this.isLoading = false;
        },
      });
    }
  }

  deleteEducation(id: string): void {
    if (confirm('Are you sure you want to delete this education entry?')) {
      this.educationService.deleteEducation(id).subscribe({
        next: () => {
          this.showMessage('Education deleted successfully!', 'success');
          this.loadEducation();
        },
        error: (err) => {
          this.showMessage('Error deleting education', 'error');
          console.error(err);
        },
      });
    }
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 3000);
  }
}
