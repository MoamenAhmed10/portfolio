import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProfileService } from './services/profile.service';
import { AboutService } from './services/about.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { ProjectService } from './services/project.service';
import { SkillService } from './services/skill.service';
import { ContactService } from './services/contact.service';
import { CvService } from './services/cv.service';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    ProfileService,
    AboutService,
    EducationService,
    ExperienceService,
    ProjectService,
    SkillService,
    ContactService,
    CvService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
