import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, throwError } from 'rxjs';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    const userService = inject(UserService)
    const token = userService.getToken()
    const router = inject(Router);

    const cloned = token
        ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        : req;

    return next(cloned).pipe(
        catchError((error) => {
        if (error.status === 401 || error.status === 403) {
            alert('Sua sessão expirou. Faça login novamente.');
            userService.clearUser();
            router.navigate(['/']); //retornar pro login
        }
        return throwError(() => error);
        })
    );
};