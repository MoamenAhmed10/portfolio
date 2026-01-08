import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectService, Project } from '../../core/services/project.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedFilter = 'all';
  apiUrl = environment.apiUrl.replace('/api', '');

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.filteredProjects = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading projects:', err),
    });
  }

  filterProjects(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'all') {
      this.filteredProjects = this.projects;
    } else if (filter === 'featured') {
      this.filteredProjects = this.projects.filter((p) => p.featured);
    }
  }

  getProjectImageUrl(image: string | undefined): string {
    if (!image) return 'assets/default-project.png';
    return `${this.apiUrl}${image}`;
  }
}
