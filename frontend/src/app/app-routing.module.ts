import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then((m) => m.EducationModule),
  },
  {
    path: 'experience',
    loadChildren: () =>
      import('./pages/experience/experience.module').then((m) => m.ExperienceModule),
  },
  {
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'skills',
    loadChildren: () => import('./pages/skills/skills.module').then((m) => m.SkillsModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./pages/cv/cv.module').then((m) => m.CvModule),
  },
  {
    path: 'admin-workspace',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
