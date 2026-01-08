import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = false;

  navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/education', label: 'Education', exact: false },
    { path: '/experience', label: 'Experience', exact: false },
    { path: '/projects', label: 'Projects', exact: false },
    { path: '/skills', label: 'Skills', exact: false },
    { path: '/contact', label: 'Contact', exact: false },
    { path: '/cv', label: 'CV', exact: false },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
