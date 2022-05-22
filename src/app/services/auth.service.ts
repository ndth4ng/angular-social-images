import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  currentUser: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afFirestore: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this._setAuth(true);
        this.currentUser = user;
        this.router.navigateByUrl('/');
      } else {
        this.currentUser = null;
        this._setAuth(false);
        this.router.navigateByUrl('sign-in');
      }
    });
  }

  signUp(signUpData: any) {
    this.afAuth
      .createUserWithEmailAndPassword(signUpData.email, signUpData.password)
      .then((response) => {
        this._addUser(response.user);
      })
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  signIn(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {})
      .catch((err: Error) => {
        alert(err.message);
      });
  }

  signOut() {
    this.afAuth.signOut();
  }

  private _setAuth(value: boolean) {
    this.isAuth.next(value);
  }

  private _addUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afFirestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    userRef.set(userData, {
      merge: true,
    });
  }
}
