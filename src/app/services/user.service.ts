import { inject, Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../models/interface-bares';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firestore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor() {}

  /*  Obtiene un usuario desde Firestore por su ID.*/

  getUserById(id: string): Observable<IUser> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<IUser>;
  }

  /*  Guarda un nuevo usuario en Firestore (se llama al registrarse). */

  saveUser(user: IUser) {
    const uid = this.auth.currentUser?.uid;
    if (!uid) throw new Error('Usuario no autenticado');

    const userRef = doc(this.firestore, `users/${uid}`);
    return setDoc(userRef, {
      nombre: user.nombre || '',
      nickname: user.nickname || '', 
      moto: user.moto || '',
      email: user.email || '',
      avatar: user.avatar || ''
    });
  }

  /* Actualiza los datos del perfil del usuario. */
  updateUser(user: IUser) {
    if (!user.id) throw new Error('El usuario no tiene ID válido');

    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, {
      nombre: user.nombre,
      nickname: user.nickname,
      moto: user.moto,
      email: user.email,
      avatar: user.avatar
    });
  }
}
