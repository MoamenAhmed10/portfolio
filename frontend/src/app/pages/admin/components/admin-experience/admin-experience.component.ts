import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ExperienceService, Experience } from '../../../../core/services/experience.service';

@Component({
  selector: 'app-admin-experience',
  standalone: false,
  templateUrl: './admin-experience.component.html',
  styleUrls: ['./admin-experience.component.css'],
})
export class AdminExperienceComponent implements OnInit {
  experienceList: Experience[] = [];
  experienceForm: FormGroup;
  isEditing = false;
  editingId: string | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;

  constructor(private fb: FormBuilder, private experienceService: ExperienceService) {
    this.experienceForm = this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      current: [false],
      description: [''],
      responsibilities: this.fb.array([]),
      technologies: [''],
      order: [0],
    });
  }

  get responsibilities(): FormArray {
    return this.experienceForm.get('responsibilities') as FormArray;
  }

  ngOnInit(): void {
    this.loadExperience();
  }

  loadExperience(): void {
    this.experienceService.getAllExperience().subscribe({
      next: (data) => (this.experienceList = data),
      error: (err) => console.error('Error loading experience:', err),
    });
  }

  addResponsibility(value = ''): void {
    this.responsibilities.push(this.fb.control(value));
  }

  removeResponsibility(index: number): void {
    this.responsibilities.removeAt(index);
  }

  onSubmit(): void {
    if (this.experienceForm.invalid) return;

    this.isLoading = true;
    const formValue = this.experienceForm.value;

    // Convert technologies string to array
    if (typeof formValue.technologies === 'string') {
      formValue.technologies = formValue.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t);
    }

    if (this.isEditing && this.editingId) {
      this.experienceService.updateExperience(this.editingId, formValue).subscribe({
        next: () => {
          this.showMessage('Experience updated successfully!', 'success');
          this.resetForm();
          this.loadExperience();
        },
        error: (err) => {
          this.showMessage('Error updating experience', 'error');
          console.error(err);
        },
      });
    } else {
      this.experienceService.createExperience(formValue).subscribe({
        next: () => {
          this.showMessage('Experience added successfully!', 'success');
          this.resetForm();
          this.loadExperience();
        },
        error: (err) => {
          this.showMessage('Error adding experience', 'error');
          console.error(err);
        },
      });
    }
  }

  editExperience(exp: Experience): void {
    this.isEditing = true;
    this.editingId = exp._id || null;
    this.experienceForm.patchValue({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      current: exp.current || false,
      description: exp.description || '',
      technologies: exp.technologies?.join(', ') || '',
      order: exp.order || 0,
    });

    this.responsibilities.clear();
    if (exp.responsibilities) {
      exp.responsibilities.forEach((r) => this.addResponsibility(r));
    }
  }

  deleteExperience(id: string | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this experience?')) return;

    this.experienceService.deleteExperience(id).subscribe({
      next: () => {
        this.showMessage('Experience deleted successfully!', 'success');
        this.loadExperience();
      },
      error: (err) => {
        this.showMessage('Error deleting experience', 'error');
        console.error(err);
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.experienceForm.reset({ current: false, order: 0 });
    this.responsibilities.clear();
    this.isLoading = false;
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.isLoading = false;
    setTimeout(() => (this.message = ''), 3000);
  }
}
