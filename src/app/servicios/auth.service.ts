import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, userData);
  }
}
