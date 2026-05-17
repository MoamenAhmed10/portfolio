import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EducationService, Education } from '../../core/services/education.service';

@Component({
  selector: 'app-education',
  standalone: false,
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  educationList: Education[] = [];

  constructor(
    private educationService: EducationService,
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Education | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content: 'View my educational background, degrees, institutions, and academic achievements.',
    });
    this.loadEducation();
  }

  loadEducation(): void {
    this.educationService.getAllEducation().subscribe({
      next: (data) => {
        this.educationList = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading education:', err),
    });
  }

  get educationCount(): number {
    return this.educationList.length;
  }

  get earliestYear(): string {
    if (this.educationList.length === 0) return '';
    return Math.min(
      ...this.educationList.map((e) => parseInt(e.startDate.split('/')[2] || '2024')),
    ).toString();
  }

  get latestYear(): string {
    if (this.educationList.length === 0) return '';
    const years = this.educationList.map((e) => {
      const endYear = e.endDate
        ? parseInt(e.endDate.split('/')[2] || '2024')
        : new Date().getFullYear();
      return endYear;
    });
    return Math.max(...years).toString();
  }

  get averageGPA(): number {
    const gpas = this.educationList.filter((e) => e.gpa).map((e) => parseFloat(e.gpa || '0'));
    if (gpas.length === 0) return 0;
    return Math.round((gpas.reduce((a, b) => a + b, 0) / gpas.length) * 100) / 100;
  }

  get hasGPA(): boolean {
    return this.educationList.some((e) => e.gpa);
  }
}
