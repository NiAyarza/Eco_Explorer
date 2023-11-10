import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../servicios/auth.service';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Lista de rutas que no requieren token
    const noAuthRequired = ['/login', '/registro'];

    // Verificar si la URL actual está en la lista de noAuthRequired
    if (noAuthRequired.some(url => req.url.includes(url))) {
        // Si es una de esas rutas, simplemente pasamos la solicitud sin modificar
        return next.handle(req);
    }

    const token = this.auth.getToken();
    if (!token) {
        return throwError(new Error('No autorizado'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
}
}
