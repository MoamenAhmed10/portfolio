import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  menuItems = [
    { path: 'profile', label: 'Profile & Photo', icon: 'fas fa-user' },
    { path: 'about', label: 'About', icon: 'fas fa-info-circle' },
    { path: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
    { path: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { path: 'projects', label: 'Projects', icon: 'fas fa-folder-open' },
    { path: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { path: 'contact', label: 'Contact', icon: 'fas fa-address-card' },
    { path: 'cv', label: 'CV', icon: 'fas fa-file-pdf' },
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Admin Dashboard | Portfolio');
    this.meta.updateTag({
      name: 'description',
      content:
        'Manage profile content, about copy, skills, projects, contact details, and the CV from a single dashboard.',
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin-workspace/login']);
  }
}
