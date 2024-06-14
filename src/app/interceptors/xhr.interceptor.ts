import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const xhrInterceptor: HttpInterceptorFn = (req, next) => {
  let httpHeaders = new HttpHeaders();
  // if(sessionStorage.getItem('user')){
  //   user = JSON.parse(sessionStorage.getItem('user')!);
  // }
  // if(user && user.password && user.username){
  //   httpHeaders = httpHeaders.append('Authorization', 'Basic ' + window.btoa(user.email + ':' + user.password));
  // }else {
  //   let authorization = sessionStorage.getItem('Authorization');
  //   if(authorization){
  //     httpHeaders = httpHeaders.append('Authorization', authorization); 
  //   }
  // }
  // const xhr = req.clone({
  //   headers: httpHeaders
  // });
  // console.log(xhr);
  return next(req).pipe(tap(
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
      }
    }));
};