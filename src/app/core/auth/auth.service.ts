import {inject, Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, user, User} from '@angular/fire/auth';
import {map, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly auth: Auth = inject(Auth)

  user$: Observable<User | null> = user(this.auth);
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user));

  constructor() {
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return credential.user;
    } catch (e: any) {
      if (e.code === 'auth/invalid-credential') {
        throw new Error('E-mail ou senha inválidos. Verifique os valores digitados');
      }

      throw new Error('Erro ao fazer login.');
    }
  }


  logout(): Promise<void> {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser
  }

}
