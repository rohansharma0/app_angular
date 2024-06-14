import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
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

  onSubmit() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe((res : HttpResponse<User>) => {
        let user : User | null = res.body; 
        let token = res.headers.get("Authorization") || "";
        sessionStorage.setItem("auth" , token);
        sessionStorage.setItem("user" , JSON.stringify(user));
        this.router.navigate([""]);
      })
    }
  }
}
