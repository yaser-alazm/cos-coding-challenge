import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sha512 } from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { 
  }

  login(userId: string, password: string) {
    return this.httpClient.put<LoginDTO>(`/api/v1/authentication/${userId}`, {
        "password": this.hasPassword(password)
      })
  }

  private hasPassword(password: string, count: number = 0): string {
    if(count === 5) {
      return password;
    }
    return this.hasPassword(sha512(password), ++count)
  }
}
