import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Machine } from '../../models/Machine';
import { User } from '../../models/user';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-machine-manager',
  standalone: true,
  imports: [],
  templateUrl: './machine-manager.component.html',
  styleUrl: './machine-manager.component.scss'
})
export class MachineManagerComponent implements OnInit {
  
  constructor(private machineService : MachineService , private authService : AuthService){}

  machines : Machine[] = [];
  user !: User;

  ngOnInit(): void {
      this.getAllMachines();
      this.user = JSON.parse(sessionStorage.getItem("USER")!);
  }

  getAllMachines(){
    this.machineService.getAllMachines().subscribe((res : Machine[]) => {
      this.machines = res;
    })
  }
  logout(){
    this.authService.logout();
  }

  deleteMachine(machineId : number){
    if(this.user.role !== "ROLE_ADMIN") return;
    this.machineService.deleteMachine(machineId).subscribe((res) =>{
      this.getAllMachines();
    })
  }

  getMachine(machineId : number) {
    
  }
}
