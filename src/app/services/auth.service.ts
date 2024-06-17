import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiUrls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email:string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`, {email: email});
  }

  resetPassWordService(resetObj:any){
    return this.http.post<any>(`${apiUrls.authServiceApi}reset-password`, resetObj);
  }

  // isLoggedIn(){
  //   return !!localStorage.getItem("user_id");
  // }
  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return !!localStorage.getItem("user_id");
    }
    return false;
  }

}
