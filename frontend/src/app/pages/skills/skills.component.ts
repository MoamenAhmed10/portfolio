import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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

  orderedCategories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Languages', 'Other'];

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
    private cdr: ChangeDetectorRef,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Skills | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'A structured view of the tools, frameworks, and technologies I use to build production-ready products.',
    });
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

    this.skillGroups = this.orderedCategories
      .filter((category) => groups[category]?.length)
      .map((category) => ({
        category,
        skills: groups[category],
        icon: this.categoryIcons[category] || 'fas fa-code',
      }));
  }

  get totalSkills(): number {
    return this.skills.length;
  }

  get averageLevel(): number {
    if (this.skills.length === 0) {
      return 0;
    }

    const total = this.skills.reduce((sum, skill) => sum + (skill.level || 0), 0);
    return Math.round(total / this.skills.length);
  }

  get categoryCount(): number {
    return this.skillGroups.length;
  }

  getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      Frontend: 'Interfaces, interactions, and responsive product layers.',
      Backend: 'APIs, business rules, and server-side application logic.',
      Database: 'Data modeling, persistence, and query design.',
      DevOps: 'Deployment, automation, and runtime stability.',
      Tools: 'Daily utilities that keep delivery sharp and consistent.',
      Languages: 'Programming languages used across the stack.',
      Other: 'Supporting skills that round out the workflow.',
    };

    return descriptions[category] || 'A practical set of capabilities used in the portfolio.';
  }
}
