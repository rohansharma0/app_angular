import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  users : any[] = [];

  constructor(private userService : UserService){}

  ngOnInit(): void {
      this.getAllUsers();
  }

  getAllUsers = () =>{
    this.userService.getAllUsers().subscribe((res : HttpResponse<User[]>) => {
      if(res && res.body) this.users = res?.body;
    })
  }

  updateRole = (user : any) =>{
    this.userService.updateRole(user?.username , user?.role).subscribe((res : HttpResponse<User>) => {
      this.getAllUsers();
    })
  }
}
