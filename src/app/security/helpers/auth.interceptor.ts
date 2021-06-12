import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = sessionStorage.getItem("token");
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }

    return next.handle(authReq).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        // console.log(" all looks good");
        // http response status code

      }
    }, error => {

      if (error.status === 401) {
        this.router.navigate(['login'])
      }
    })
    )
  }

}
