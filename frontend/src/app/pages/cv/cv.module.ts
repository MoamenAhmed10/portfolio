import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: CvComponent }];

@NgModule({
  declarations: [CvComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class CvModule {}
