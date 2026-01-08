import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AboutService, About } from '../../core/services/about.service';
import { ProfileService, Profile } from '../../core/services/profile.service';
import { environment } from '../../../environments/environment';

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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
    if (!photo) return 'assets/default-avatar.png';
    return `${this.apiUrl}${photo}`;
  }
}
