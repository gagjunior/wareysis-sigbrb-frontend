import {Injectable} from '@angular/core';
import {Auth, signInWithEmailAndPassword, UserCredential} from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth: Auth) {
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

}
