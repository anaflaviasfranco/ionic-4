import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth
  ) { 
    this.user$ = afAuth.authState;
  }

  public loginWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {

    return this.afAuth.auth.signInWithEmailAndPassword(email,password);

  }

  public logout(): Promise<void> {

    return this.afAuth.auth.signOut();


  }
}
