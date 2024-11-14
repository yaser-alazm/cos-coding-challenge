import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShellService {
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  setIsLoading(isloading: boolean) {
    this.loading$.next(isloading);
  }

  isLoading() {
    return this.loading$.asObservable();
  }
}
