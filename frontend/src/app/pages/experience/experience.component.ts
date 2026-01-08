import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
}
