import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShellService } from './shell.service';
import { SessionService } from '../../core/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit, OnDestroy {
  loading: boolean;

  private sub: Subscription;

  constructor(
    private shellService: ShellService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private sessionService: SessionService,
  ) { }

  ngOnInit() {
    this.sub = this.shellService.isLoading().subscribe((loading) => {
      this.loading = loading;
      //Manually detecting changes in case the event source is not tracked by zonejs
      this.cdr.detectChanges(); 
    });
  }

  logoutAndRedirect() {
    this.sessionService.clearSession();
    this.router.navigate(['login'])
  }

  ngOnDestroy() {
    if(!!this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }
}
