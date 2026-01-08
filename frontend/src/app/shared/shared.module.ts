import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, SafeUrlPipe],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, FooterComponent, SafeUrlPipe],
})
export class SharedModule {}
