import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClienteData } from '../interfaces/clienteData';
import { Router } from '@angular/router';

 
@Injectable({
  providedIn: 'root'
})

export class AuthService  {
  private  apiUrl  = 'http://localhost/EcoExplorer/BACKEND/api';

  private datosContrato: any = {};

  constructor(private http: HttpClient, private router: Router) { }

  // registrar a un usuario
  registro(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro.php`, formData);
  }
  registroEmp(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registroEmp.php`, formData);
  }
  // Obtener comunas guardadas en la base de datos
  getComunas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comuna.php`);
  }

  login(email: string, password: string, tipo: string): Observable<any> {
    const body = { email, password, tipo };
    return this.http.post<any>(`${this.apiUrl}/login.php`, body)
      .pipe(
        tap(response => {
          if (response && response.success) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email);
            localStorage.setItem('tipo', tipo);
            const now = new Date();
            const expiry = new Date(now.getTime() + 60 * 60 * 1000 * 24);
            localStorage.setItem('tokenExpiry', expiry.toString());
          }
        })
      );
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('tokenExpiry');
    if (!expiry) {
      return true;
    }
    const now = new Date();
    return now > new Date(expiry);
  }

  getToken(): string | null {
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('tipo');
    this.router.navigateByUrl('/login'); 
  }

  editarCliente(data: any) {
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    // Obtener el email del localStorage
    const email = localStorage.getItem('email');

    // Asegúrate de que el email exista
    if (!email) {
        throw new Error('No se encontró el email en el almacenamiento local');
    }

    // Agregar el email a los datos enviados
    const dataToSend = {
        ...data,
        email: email
    };

    return this.http.post(`${this.apiUrl}/editar.php`, dataToSend, { headers: headers })
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
    const email = localStorage.getItem('email');
    return this.http.get<ClienteData>(`${this.apiUrl}/obtenerDatosCliente.php?email=${email}`)
        .pipe(
            catchError(this.handleError)
        );
  }

  obtenerDatosEmp(): Observable<ClienteData> {
    const email = localStorage.getItem('email');
    return this.http.get<ClienteData>(`${this.apiUrl}/obtenerDatosEmp.php?email=${email}`)
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: any) {
      console.error('An error occurred:', error);
      return throwError('Algo salió mal. Por favor, inténtalo de nuevo.');
  }

  getPuntosAcopio(): Observable<any> {
      return this.http.get<any[]>(`${this.apiUrl}/puntoAcopio.php`);
  }

  getServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/servicio.php`);
  }

  setDatosContrato(datos: any) {
    this.datosContrato = datos;
  }

  getDatosContrato() {
    return this.datosContrato;
  }

  enviarDatosContrato(datosContrato: any) {
    const formData = new FormData();
    formData.append('fechaInicio', datosContrato.fechaInicio);
    formData.append('fechaFin', datosContrato.fechaFin);
    formData.append('servicio_id', datosContrato.servicio_id.toString()); // Asegúrate de que sea una cadena
    formData.append('email', datosContrato.email);

    return this.http.post(`${this.apiUrl}/contrato.php`, formData);
  }
  
}
