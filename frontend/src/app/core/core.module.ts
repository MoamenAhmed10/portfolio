import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ProfileService } from './services/profile.service';
import { AboutService } from './services/about.service';
import { EducationService } from './services/education.service';
import { ExperienceService } from './services/experience.service';
import { ProjectService } from './services/project.service';
import { SkillService } from './services/skill.service';
import { ContactService } from './services/contact.service';
import { CvService } from './services/cv.service';

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
  ],
})
export class CoreModule {}
