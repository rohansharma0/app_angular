import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { HttpResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { ChatService } from '../../services/chat.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private authService : AuthService , private userService : UserService , private chatService : ChatService){}

  user !: User;
  isAdmin : boolean = false;
  searchUsers !: User[];
  socket !: Socket;

  searchUserForm = new FormGroup({
    username : new FormControl('',[
      Validators.required,
      Validators.minLength(1),
    ])
  })

  changePasswordForm = new FormGroup({
    password : new FormControl('',[
      Validators.required,
      Validators.minLength(5),
    ])
  })

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("USER")!);
    this.checkAdminUser();
    this.socket = this.chatService.connect();
  }

  checkAdminUser(){
    this.userService.isAdmin(this.user?.username).subscribe((res  : HttpResponse<boolean>) => {
      if(res && res.body !== null) this.isAdmin = res.body;
      sessionStorage.setItem("isAdmin",  JSON.stringify(this.isAdmin));
    })
  }

  onSearch(){
    console.log(this.searchUserForm);
    
    if(this.searchUserForm.valid && this.searchUserForm.value.username){
      this.userService.getUsersByUsername(this.searchUserForm.value.username).subscribe((res : HttpResponse<User[]>) => {
        console.log(res);
        if(res && res.body){
          let allusers = res.body;
          allusers = allusers.filter((user) => user.username !== this.user.username);
          this.searchUsers = allusers;
        }
      })
    }
  }

  logout(){
    this.authService.logout();
  }

  changePassword(){
    if(this.changePasswordForm.valid){
      this.userService.changePassword(this.user?.username, this.changePasswordForm.value.password!).subscribe((res : HttpResponse<User>) => {
        console.log(res);
      });
    }
  }

  startChat(){
    this.socket = this.chatService.connect();
    // this.chatService.joinChatRoom();
  }
}
