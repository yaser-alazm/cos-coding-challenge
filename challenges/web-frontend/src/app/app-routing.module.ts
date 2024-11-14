import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CanLoadAuthenthicatedPage } from './core/session.guard';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', 
    component: ShellComponent,
    canActivate: [CanLoadAuthenthicatedPage],
    children: [{
      path: 'home',
      loadChildren: './home/home.module#HomeModule',
    }]
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // , {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
