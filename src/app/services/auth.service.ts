import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AppConstants } from '../constants/AppContants';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  isAuth = () : string | null  => {
    if(sessionStorage.getItem('auth')){
      return sessionStorage.getItem('auth');
    }
    return null;
  }

  login = (username : any, password : any) : Observable<HttpResponse<User>> => {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(username + ':' + password));
    return this.http.get<User>(environment.rootUrl + AppConstants.LOGIN_API_URL , { observe: 'response',withCredentials: true , headers : httpHeaders})
  }

  register = (form : FormGroup)=>{
    let user : User = {
      username : form.value.username,
      firstName : form.value.username,
      lastName: form.value.username,
      email: form.value.email,
      password : form.value.username,
    }
    return this.http.post(environment.rootUrl + AppConstants.REGISTER_API_URL , user);
  }

  logout = () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("user");
    window.location.reload();
  }
}
