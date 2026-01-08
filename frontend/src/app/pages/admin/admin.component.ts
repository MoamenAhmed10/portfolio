import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
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
}
