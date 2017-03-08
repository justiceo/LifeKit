import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getRefreshToken(): string {
    return window.localStorage['refToken'];
  }

  saveRefreshToken(token: string) {
    window.localStorage['refToken'] = token;
  }

  destroyRefreshToken() {
    window.localStorage.removeItem('refToken');
  }

  getAccessToken(): string {
    return window.localStorage["accessToken"];
  }

  saveAccessToken(token: string) {
    window.localStorage['accessToken'] = token;
  }

  destroyAccessToken() {
    window.localStorage.removeItem('accessToken');
  }

}
