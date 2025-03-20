import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from './../../../enviroment/enviroment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly loginUrl = '/api/v1/usuarios/login';

  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('URL solicitada:', request.url);
    console.log('¿Es URL de login?:', request.url.includes(this.loginUrl));

    // Si es la ruta de login, no agregamos el token
    if (request.url.includes(this.loginUrl)) {
      return next.handle(request);
    }

    const token = localStorage.getItem('token');
    console.log('Token encontrado:', !!token);

    if (token) {
      console.log('Agregando token a la petición');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(
        'Headers después de agregar token:',
        request.headers.get('Authorization')
      );
    } else {
      console.log('No se encontró token en localStorage');
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error en la petición:', error);
        if (error.status === 401) {
          console.log(
            'Error 401 - Limpiando localStorage y redirigiendo a login'
          );
          localStorage.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
