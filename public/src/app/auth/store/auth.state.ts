import { Action, State, StateContext } from '@ngxs/store';
import { AuthChange, LoginAnon, LoginEmail, LoginGoogle, Logout, Register } from './auth.actions';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { ChangeUserInfo } from '../../shell/store/user.actions';

export interface AuthStateModel {
  uid: string;
  user: User;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    uid: null,
    user: null
  }
})
export class AuthState {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  @Action(AuthChange)
  authChange({ patchState }: StateContext<AuthStateModel>, { payload }: AuthChange) {
    patchState ({
      uid: payload.uid,
      user: payload.user
    });
  }
  @Action(LoginGoogle)
  loginGoogle({ }: StateContext<AuthStateModel>) {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).pipe(tap(() => {
      const user = this.afAuth.auth.currentUser;
      console.log(user);
      this.router.navigate(['/']);
    }));
  }
  @Action(LoginEmail)
  loginEmail({ }: StateContext<AuthStateModel>, { payload }: LoginEmail) {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password)
    ).pipe(tap(user => {
      this.router.navigate(['/']);
    }));
  }

  @Action(LoginAnon)
  loginAnon({ dispatch }: StateContext<AuthStateModel>) {
    return Observable.fromPromise(
      this.afAuth.auth.signInAnonymously())
    .pipe(tap(user => {
      this.router.navigate(['/']);
      dispatch(new ChangeUserInfo({name: 'Gast', handicap: 54}));
    }));
  }

  @Action(Register)
  register({ dispatch }: StateContext<AuthStateModel>, { payload }: Register) {
    console.log(payload);
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(payload.email, payload.password))
      .pipe(tap(user => {
        this.router.navigate(['/']);
        dispatch(new ChangeUserInfo({name: payload.name, handicap: payload.handicap}));
        // TODO Set Name and HCP: change via Actions ChangeName, ChangeHcp; data is in Payload
      }));
  }

  @Action(Logout)
  logout({ }: StateContext<AuthStateModel>) {
    return Observable.fromPromise(
      this.afAuth.auth.signOut())
      .pipe(tap(() => {
        this.router.navigate(['/login']);
      }));
  }

}
