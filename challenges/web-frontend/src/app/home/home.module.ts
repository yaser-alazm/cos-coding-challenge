import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TimeleftPipe } from './pipes/timeleft.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: HomeComponent,
}];

@NgModule({
  declarations: [HomeComponent, TimeleftPipe],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class HomeModule { }
