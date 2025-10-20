export interface InterfaceBares {
  id: number;
  valoracion: number;
  nombre: string;
  direccion: string;
  telefono: string;
  descripcion: string;
  imagen: string;
  mapa: string;
}

export interface IUser {
  id?: string;
  nombre: string;
  moto?: string;
  email: string;
  avatar: string;
}