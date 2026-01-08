import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService, Project } from '../../../../core/services/project.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-projects',
  standalone: false,
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css'],
})
export class AdminProjectsComponent implements OnInit {
  projects: Project[] = [];
  projectForm: FormGroup;
  isEditing = false;
  editingId: string | null = null;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      technologies: [''],
      liveUrl: [''],
      githubUrl: [''],
      featured: [false],
      order: [0],
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Error loading projects:', err),
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.isLoading = true;
    const formData = new FormData();

    Object.keys(this.projectForm.value).forEach((key) => {
      formData.append(key, this.projectForm.value[key]);
    });

    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.isEditing && this.editingId) {
      this.projectService.updateProject(this.editingId, formData).subscribe({
        next: () => {
          this.showMessage('Project updated successfully!', 'success');
          this.resetForm();
          this.loadProjects();
        },
        error: (err) => {
          this.showMessage('Error updating project', 'error');
          console.error(err);
        },
      });
    } else {
      this.projectService.createProject(formData).subscribe({
        next: () => {
          this.showMessage('Project added successfully!', 'success');
          this.resetForm();
          this.loadProjects();
        },
        error: (err) => {
          this.showMessage('Error adding project', 'error');
          console.error(err);
        },
      });
    }
  }

  editProject(project: Project): void {
    this.isEditing = true;
    this.editingId = project._id || null;
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured || false,
      order: project.order || 0,
    });
    if (project.image) {
      this.imagePreview = `${this.apiUrl}${project.image}`;
    }
  }

  deleteProject(id: string | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this project?')) return;

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.showMessage('Project deleted successfully!', 'success');
        this.loadProjects();
      },
      error: (err) => {
        this.showMessage('Error deleting project', 'error');
        console.error(err);
      },
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingId = null;
    this.projectForm.reset({ featured: false, order: 0 });
    this.selectedImage = null;
    this.imagePreview = null;
    this.isLoading = false;
  }

  getProjectImageUrl(image: string | undefined): string {
    if (!image) return '';
    return `${this.apiUrl}${image}`;
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.isLoading = false;
    setTimeout(() => (this.message = ''), 3000);
  }
}
