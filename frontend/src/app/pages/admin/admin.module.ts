import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminAboutComponent } from './components/admin-about/admin-about.component';
import { AdminEducationComponent } from './components/admin-education/admin-education.component';
import { AdminExperienceComponent } from './components/admin-experience/admin-experience.component';
import { AdminProjectsComponent } from './components/admin-projects/admin-projects.component';
import { AdminSkillsComponent } from './components/admin-skills/admin-skills.component';
import { AdminContactComponent } from './components/admin-contact/admin-contact.component';
import { AdminCvComponent } from './components/admin-cv/admin-cv.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'about', component: AdminAboutComponent },
      { path: 'education', component: AdminEducationComponent },
      { path: 'experience', component: AdminExperienceComponent },
      { path: 'projects', component: AdminProjectsComponent },
      { path: 'skills', component: AdminSkillsComponent },
      { path: 'contact', component: AdminContactComponent },
      { path: 'cv', component: AdminCvComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminProfileComponent,
    AdminAboutComponent,
    AdminEducationComponent,
    AdminExperienceComponent,
    AdminProjectsComponent,
    AdminSkillsComponent,
    AdminContactComponent,
    AdminCvComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
