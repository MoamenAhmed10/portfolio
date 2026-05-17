import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CvService, CV } from '../../core/services/cv.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cv',
  standalone: false,
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
})
export class CvComponent implements OnInit {
  cv: CV | null = null;
  downloadUrl = '';
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private cvService: CvService,
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('CV / Resume | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'Preview and download the latest resume with a built-in PDF viewer and direct download link.',
    });
    this.loadCV();
    this.downloadUrl = this.cvService.getDownloadUrl();
  }

  loadCV(): void {
    this.cvService.getCV().subscribe({
      next: (data) => {
        this.cv = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading CV:', err),
    });
  }

  getCvViewUrl(): string {
    if (!this.cv?.path) return '';
    return `${this.apiUrl}${this.cv.path}`;
  }

  formatFileSize(bytes: number | undefined): string {
    if (!bytes) return '';
    const kb = bytes / 1024;
    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get lastUpdated(): string {
    return this.cv?.createdAt || this.cv?.uploadedAt || '';
  }
}
