import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth/guards/auth.guard';
import { MachineManagerComponent } from './pages/machine-manager/machine-manager.component';

export const routes: Routes = [
    { path: '', component: MachineManagerComponent , canActivate:[authGuard]},
    { path: 'admin', loadChildren:() => import("./admin/admin.module").then(m => m.AdminModule)},
    { path: 'auth', loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)},
]
