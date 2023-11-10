export interface ClienteData {
    nombre: string;
    apellido: string;
    fecha_nac: string;
    email: string;
    comuna: string;
}

export interface ApiResponse {
    success: boolean;
    data: ClienteData;
  }