import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminRoutingModule } from './auth-routing.module';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    AdminRoutingModule
  ]
})
export class AdminModule { }
