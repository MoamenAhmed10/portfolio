import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService, Profile } from '../../core/services/profile.service';
import { ProjectService, Project } from '../../core/services/project.service';
import { environment } from '../../../environments/environment';
import { createImagePlaceholder } from '../../shared/utils/image-placeholder';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  profile: Profile | null = null;
  featuredProjects: Project[] = [];
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private profileService: ProfileService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadFeaturedProjects();
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

  loadFeaturedProjects(): void {
    this.projectService.getFeaturedProjects().subscribe({
      next: (data) => {
        this.featuredProjects = data.slice(0, 3);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading projects:', err),
    });
  }

  getPhotoUrl(photo: string | undefined): string {
    if (!photo) {
      return createImagePlaceholder(this.profile?.name || 'Portfolio', '#7c8cff', '#13203d');
    }
    return `${this.apiUrl}${photo}`;
  }

  getProjectImageUrl(image: string | undefined, title?: string): string {
    if (!image) {
      return createImagePlaceholder(title || 'Featured project', '#5fd0ff', '#121a30');
    }
    return `${this.apiUrl}${image}`;
  }
}
