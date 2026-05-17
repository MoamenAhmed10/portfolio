import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ExperienceService, Experience } from '../../core/services/experience.service';

@Component({
  selector: 'app-experience',
  standalone: false,
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  experienceList: Experience[] = [];

  constructor(
    private experienceService: ExperienceService,
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Experience | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'Explore my professional work experience, roles, companies, and key accomplishments.',
    });
    this.loadExperience();
  }

  loadExperience(): void {
    this.experienceService.getAllExperience().subscribe({
      next: (data) => {
        this.experienceList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading experience:', err),
    });
  }

  get experienceCount(): number {
    return this.experienceList.length;
  }

  get currentRoles(): number {
    return this.experienceList.filter((e) => e.current).length;
  }

  get uniqueCompanies(): number {
    const companies = new Set(this.experienceList.map((e) => e.company));
    return companies.size;
  }

  get yearsOfExperience(): number {
    if (this.experienceList.length === 0) return 0;
    const startYears = this.experienceList.map((e) =>
      parseInt(e.startDate.split('/')[2] || '2024'),
    );
    const earliestYear = Math.min(...startYears);
    return new Date().getFullYear() - earliestYear;
  }

  get totalTechnologies(): number {
    const techSet = new Set<string>();
    this.experienceList.forEach((exp) => {
      exp.technologies?.forEach((tech) => techSet.add(tech));
    });
    return techSet.size;
  }
}
