import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HomeService } from './home.service';
import { NgZone } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Auction } from './home.model';
import { catchError, finalize, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ShellService } from '../shared/shell/shell.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  auctions$: BehaviorSubject<Auction[]> = new BehaviorSubject([]);
  loading: boolean;
  private interval;

  constructor(
    private ngZone: NgZone, 
    private homeService: HomeService,
    private cdr: ChangeDetectorRef,
    private shellService: ShellService
  ) { }

  ngOnInit() {
    this.getAuctions(); // fetch the first round of data
    this.startDataPolling();
  }

  trackById(auction: Auction) {
    return auction.id;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private getAuctions() {
    this.shellService.setIsLoading(true);

    this.homeService.getRunningAuctions().pipe(
      first(),
      catchError((error: HttpErrorResponse) => {
        //IMPROVEMENT: show error when fetching yield error
        return of(null)
      }),
      finalize(() => {
        this.shellService.setIsLoading(false);
      })
    ).subscribe((res) => {
      if(!!res) {
        this.auctions$.next(res.items);

        //manually detecting change since the source of action is not tracked by zonejs
        this.cdr.detectChanges(); 
      }
    })
  }

  private startDataPolling() {
    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.getAuctions();
      }, 20000);
    })
  }

}
