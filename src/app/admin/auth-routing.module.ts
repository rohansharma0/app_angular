import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { authGuard } from "../auth/guards/auth.guard";
import { adminGuard } from "./guards/admin.guard";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";

const routes: Routes = [
    { path: '', redirectTo:'dashboard' , pathMatch:"full"},
    { path: 'dashboard', component: DashboardComponent , canActivate:[authGuard , adminGuard]},
    { path: 'profile/:username', component: EditProfileComponent , canActivate:[authGuard , adminGuard]},
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
  