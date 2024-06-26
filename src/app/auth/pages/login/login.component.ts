import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private authService :AuthService , private router : Router){}

  loginForm = new FormGroup({
    username : new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(5),
    ])
  })

  errorMessage !: string;

  onSubmit() {
    if(this.loginForm.valid && this.loginForm.value.username && this.loginForm.value.password){
      this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe((res : HttpResponse<User>) => {
        let user : User | null = res.body; 
        let token = res.headers.get("Authorization") || "";
        let crsf = res.headers.get("X-XSRF-TOKEN") || "";
        sessionStorage.setItem("AUTH-TOKEN" , token);
        if(crsf) sessionStorage.setItem("XSRF-TOKEN" , crsf);
        sessionStorage.setItem("USER" , JSON.stringify(user));
        this.router.navigate([""]);
      } , (error) => {
        this.errorMessage = "Invalid username or password!!";
      })
    }
  }
}
