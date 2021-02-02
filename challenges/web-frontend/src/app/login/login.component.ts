import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../core/session.service';
import { LoginService } from './login.service';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, finalize, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', {validators: Validators.required}),
    password: new FormControl('', {validators: Validators.required})
  });

  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  resetError() {
    this.errorMessage = '';
  }

  login(form: FormGroup) {
    const formValue = form.value;
    
    this.loading = true;
    this.loginService.login(formValue.username.trim(), formValue.password.trim()).pipe(
        first(),
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = (!!error.error && !!error.error.message) ? error.error.message : ''
          return of(false)
        }),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      ).subscribe((response: LoginDTO) => {
        if(!response) return;
        
        if(response.type == 0) {
          this.errorMessage = 'Only buyers are allowed to login.';
          return;
        }

        this.sessionService.setSession(response);
        this.router.navigate(['home']);
    });
  }
}
