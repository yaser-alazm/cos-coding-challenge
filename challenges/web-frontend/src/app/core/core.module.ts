import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpHeadersInterceptor } from './http-headers.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CanLoadAuthenthicatedPage } from './session.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CanLoadAuthenthicatedPage,
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
  ]
})
export class CoreModule { }
