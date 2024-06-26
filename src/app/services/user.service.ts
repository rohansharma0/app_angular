import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { environment } from '../../environments/environment.development';
import { AppConstants } from '../constants/AppContants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers = () : Observable<HttpResponse<User[]>> => {
    return this.http.get<User[]>(environment.rootUrl + AppConstants.USER , {observe : "response" , withCredentials:true});
  }

  getUser = (username : string) : Observable<HttpResponse<User>> => {
    return this.http.get<User>(environment.rootUrl + AppConstants.USER  + username , {observe : "response" , withCredentials:true});
  }

  updateUser = (username : string , form : FormGroup) : Observable<HttpResponse<User>>  => {
    return this.http.put<User>(environment.rootUrl + AppConstants.USER + username , {...form.value} , {observe : "response" , withCredentials:true});
  }

  changePassword = (username : string , newPassword : string) : Observable<HttpResponse<User>>=> {
    return this.http.put<User>(environment.rootUrl + AppConstants.USER + username +"/password" , {data : newPassword} , {observe : "response" , withCredentials:true})
  }

  isAdmin = (username : string) : Observable<HttpResponse<boolean>> =>{
    return this.http.get<boolean>(environment.rootUrl +  AppConstants.USER  + username +"/isAdmin" , {observe : "response" , withCredentials:true});
  }

  updateRole = (username : string , role : string) : Observable<HttpResponse<User>>=> {
    return this.http.put<User>(environment.rootUrl + AppConstants.USER+ username +"/role" , {data: role === "ROLE_ADMIN" ? "ROLE_USER" : "ROLE_ADMIN"} , {observe : "response" , withCredentials:true});
  }

  getUsersByUsername = (username : string) : Observable<HttpResponse<User[]>> =>{
    return this.http.get<User[]>(environment.rootUrl + AppConstants.USER + "search/" + username , {observe : "response" , withCredentials:true});
  }
}
