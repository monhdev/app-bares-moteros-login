import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../models/interface-bares';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  constructor() { }

  getUserById(id: string): Observable<IUser> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<IUser>;
  }

  saveUser(user: IUser) {
    const userRef = doc(this.firestore, `users/${this.auth.currentUser?.uid}`);
    return setDoc(userRef, user);
  }

  updateUser(user: IUser) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(userDocRef, { ...user });
  }

}
