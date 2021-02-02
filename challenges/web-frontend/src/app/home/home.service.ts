import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuctionsDTO } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getRunningAuctions() {
    return this.httpClient.get<AuctionsDTO>(`/api/v2/auction/buyer/`)
  }

}
