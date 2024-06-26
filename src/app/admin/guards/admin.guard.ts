import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  // let isAdmin : boolean = false;
  // const user = JSON.parse(sessionStorage.getItem("user")!);
  // const isAdmin = JSON.parse(sessionStorage.getItem("isAdmin")!);
  // const username = user.username;
  // userService.isAdmin(username).subscribe((res) => {
    // isAdmin=res;
    // console.log(res);
    // if(!isAdmin){
    //   router.navigate(['']);
    // }
    // return res;
  // })
  return true;
};
