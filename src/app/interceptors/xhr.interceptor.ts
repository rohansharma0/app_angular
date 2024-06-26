import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';

export const xhrInterceptor: HttpInterceptorFn = (req, next) => {
  let httpHeaders = req.headers;
  let authorization = sessionStorage.getItem('AUTH-TOKEN');
  if(authorization){
    httpHeaders = httpHeaders.append('Authorization', authorization); 
  }
  let xsrf = sessionStorage.getItem('XSRF-TOKEN');
  if(xsrf){
    httpHeaders = httpHeaders.append('X-XSRF-TOKEN', xsrf);  
  }
  httpHeaders = httpHeaders.append('X-Requested-With', 'XMLHttpRequest');
  const xhr = req.clone({
    headers: httpHeaders
  })
  return next(xhr).pipe(tap(
    (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
      }
    }));
};