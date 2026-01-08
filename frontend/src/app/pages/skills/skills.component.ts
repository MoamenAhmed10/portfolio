import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SkillService, Skill } from '../../core/services/skill.service';

interface SkillGroup {
  category: string;
  skills: Skill[];
  icon: string;
}

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: Skill[] = [];
  skillGroups: SkillGroup[] = [];

  categoryIcons: { [key: string]: string } = {
    Frontend: 'fas fa-laptop-code',
    Backend: 'fas fa-server',
    Database: 'fas fa-database',
    DevOps: 'fas fa-cloud',
    Tools: 'fas fa-tools',
    Languages: 'fas fa-code',
    Other: 'fas fa-puzzle-piece',
  };

  constructor(
    private skillService: SkillService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.skillService.getAllSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.groupSkillsByCategory();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading skills:', err),
    });
  }

  groupSkillsByCategory(): void {
    const groups: { [key: string]: Skill[] } = {};

    this.skills.forEach((skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }
      groups[skill.category].push(skill);
    });

    this.skillGroups = Object.keys(groups).map((category) => ({
      category,
      skills: groups[category],
      icon: this.categoryIcons[category] || 'fas fa-code',
    }));
  }
}
