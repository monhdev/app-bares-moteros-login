import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IUser } from '../models/interface-bares';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth: Auth = inject(Auth);
  private router = inject(Router);
  private userService: UserService = inject(UserService);

  constructor() { }

  async register({ email, password }: { email: string; password: string }) {
    try {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);

      const myUser: IUser = {
				nombre: '',
				email: user.user.email || '',
				avatar: '',
        moto: ''
			};

      await this.userService.saveUser(myUser);

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);

      // Redirige a tab1 al hacer login
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async logout() {
    await signOut(this.auth);

    // Redirige a login al hacer logout
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}


