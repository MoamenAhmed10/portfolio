import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
}
