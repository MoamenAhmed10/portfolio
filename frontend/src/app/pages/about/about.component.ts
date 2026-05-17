import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AboutService, About } from '../../core/services/about.service';
import { ProfileService, Profile } from '../../core/services/profile.service';
import { environment } from '../../../environments/environment';
import { createImagePlaceholder } from '../../shared/utils/image-placeholder';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  about: About | null = null;
  profile: Profile | null = null;
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private aboutService: AboutService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('About Me | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'Learn about my background, the way I work, and the highlights that shape my portfolio.',
    });
    this.loadAbout();
    this.loadProfile();
  }

  loadAbout(): void {
    this.aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading about:', err),
    });
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  getPhotoUrl(photo: string | undefined): string {
    if (!photo) {
      return createImagePlaceholder(this.profile?.name || 'About me', '#7c8cff', '#13203d');
    }
    return `${this.apiUrl}${photo}`;
  }

  get highlightCount(): number {
    return this.about?.highlights?.length ?? 0;
  }
}
