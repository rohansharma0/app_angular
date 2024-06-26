import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { User } from '../../../models/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{

  constructor(private activatedRoute : ActivatedRoute , private userService : UserService , private router : Router){}
  
  username !: string;
  user !: User;

  updateForm = new FormGroup({
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
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.username = params["username"];
    })
    this.getUserData();
  }

  getUserData(){
    this.userService.getUser(this.username).subscribe((res : HttpResponse<User>) => {
      if(res && res.body)this.setUserData(res.body);
    })
  }
  
  setUserData(res: User){
    this.user = res;
    this.updateForm.controls.username.setValue(this.user.username);
    this.updateForm.controls.firstName.setValue(this.user.firstName);
    this.updateForm.controls.lastName.setValue(this.user.lastName);
    this.updateForm.controls.email.setValue(this.user.email);
  }

  onSubmit(){
    if(this.updateForm.valid){
      this.userService.updateUser(this.username , this.updateForm).subscribe((res : HttpResponse<User>) => {
        if(res && res.body) this.setUserData(res.body);
        this.router.navigate(["admin/dashboard"])
      })
    }
  }
}
