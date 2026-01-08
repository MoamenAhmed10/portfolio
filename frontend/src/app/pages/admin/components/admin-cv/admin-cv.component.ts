import { Component, OnInit } from '@angular/core';
import { CvService, CV } from '../../../../core/services/cv.service';

@Component({
  selector: 'app-admin-cv',
  standalone: false,
  templateUrl: './admin-cv.component.html',
  styleUrls: ['./admin-cv.component.css'],
})
export class AdminCvComponent implements OnInit {
  currentCV: CV | null = null;
  selectedFile: File | null = null;
  isUploading = false;
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private cvService: CvService) {}

  ngOnInit(): void {
    this.loadCV();
  }

  loadCV(): void {
    this.cvService.getCV().subscribe({
      next: (data) => {
        if (data && data.filename) {
          this.currentCV = data;
        }
      },
      error: (err) => console.error('Error loading CV:', err),
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type
      if (file.type !== 'application/pdf') {
        this.showMessage('Please select a PDF file', 'error');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.showMessage('File size must be less than 10MB', 'error');
        return;
      }

      this.selectedFile = file;
    }
  }

  uploadCV(): void {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.cvService.uploadCV(this.selectedFile).subscribe({
      next: (data) => {
        this.currentCV = data;
        this.selectedFile = null;
        this.showMessage('CV uploaded successfully!', 'success');
        // Reset file input
        const fileInput = document.getElementById('cvFile') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        this.showMessage('Error uploading CV', 'error');
        console.error(err);
      },
    });
  }

  deleteCV(): void {
    if (!this.currentCV) return;

    if (confirm('Are you sure you want to delete this CV?')) {
      this.cvService.deleteCV().subscribe({
        next: () => {
          this.currentCV = null;
          this.showMessage('CV deleted successfully!', 'success');
        },
        error: (err) => {
          this.showMessage('Error deleting CV', 'error');
          console.error(err);
        },
      });
    }
  }

  viewCV(): void {
    if (this.currentCV) {
      window.open(this.cvService.getDownloadUrl(), '_blank');
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    this.isUploading = false;
    setTimeout(() => (this.message = ''), 3000);
  }
}
