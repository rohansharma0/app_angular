import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private authService :AuthService , private router : Router){}

  registerForm = new FormGroup({
    firstName : new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    lastName : new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.minLength(1),
      Validators.email,
    ]),
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
    console.log(this.registerForm);
    if(this.registerForm.valid){
      this.authService.register(this.registerForm).subscribe((res) => {
        this.router.navigate(['']);
      })
    }
  }
}
