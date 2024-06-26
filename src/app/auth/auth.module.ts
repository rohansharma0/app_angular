import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ForgetComponent } from './pages/forget/forget.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
