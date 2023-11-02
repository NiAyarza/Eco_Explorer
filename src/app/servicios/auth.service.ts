import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClienteData } from '../editar-cliente/editar-cliente.page';

 
@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private  apiUrl  = 'http://localhost/EcoExplorer/BACKEND/api';

  constructor(private http: HttpClient) { }

  // registrar a un usuario
  registro(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro.php`, formData);
  }
  // Obtener comunas guardadas en la base de datos
  getComunas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comuna.php`);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login.php`, body)
      .pipe(
        tap(response => {
          if (response && response.success) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  editarCliente(data: any) {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post(`${this.apiUrl}/editar`, data, { headers: headers })
        .pipe(
            map((response: any) => {
                if (response.error) {
                    throw new Error(response.error);
                }
                return response.success;
            }),
            catchError(this.handleError)
        );
  }

  obtenerDatosCliente(): Observable<ClienteData> {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get(`${this.apiUrl}/obtenerDatosCliente`, { headers: headers })
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: any) {
      console.error('An error occurred:', error);
      return throwError('Algo salió mal. Por favor, inténtalo de nuevo.');
  }
}
