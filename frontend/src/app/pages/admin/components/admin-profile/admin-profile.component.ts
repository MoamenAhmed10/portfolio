import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService, Profile } from '../../../../core/services/profile.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'],
})
export class AdminProfileComponent implements OnInit {
  profileForm: FormGroup;
  profile: Profile | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  isLoading = false;
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: [''],
      tagline: [''],
    });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        if (data && data.name) {
          this.profileForm.patchValue({
            name: data.name,
            title: data.title,
            subtitle: data.subtitle || '',
            tagline: data.tagline || '',
          });
          if (data.photo) {
            this.previewUrl = `${this.apiUrl}${data.photo}`;
          }
        }
      },
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    const formData = new FormData();
    formData.append('name', this.profileForm.value.name);
    formData.append('title', this.profileForm.value.title);
    formData.append('subtitle', this.profileForm.value.subtitle || '');
    formData.append('tagline', this.profileForm.value.tagline || '');

    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.profileService.updateProfile(formData).subscribe({
      next: (data) => {
        this.profile = data;
        this.showMessage('Profile updated successfully!', 'success');
        this.isLoading = false;
      },
      error: (err) => {
        this.showMessage('Error updating profile', 'error');
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
