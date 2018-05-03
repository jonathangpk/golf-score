import { Action, State, StateContext } from '@ngxs/store';
import { AuthChange, LoginAnon, LoginEmail, LoginGoogle, Logout, Register } from './auth.actions';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { FirestoreService } from '../../core/firestore.service';
import { ChangeUserInfo, ResetRoundState } from '../../shell/store/round.actions';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

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
  routesub: Subscription;
  params = {};
  constructor(private afAuth: AngularFireAuth, private router: Router, private fss: FirestoreService,
              private route: ActivatedRoute, private fs: AngularFirestore, private sb: MatSnackBar) {
    this.routesub = this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }
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
      this.navigateToShell();
    }));
  }
  @Action(LoginEmail)
  loginEmail({ }: StateContext<AuthStateModel>, { payload }: LoginEmail) {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(payload.email, payload.password)
    ).pipe(tap(user => {
      this.navigateToShell();
    }));
  }

  @Action(LoginAnon)
  loginAnon({ dispatch }: StateContext<AuthStateModel>) {
    return Observable.fromPromise(
      this.afAuth.auth.signInAnonymously())
    .pipe(tap(user => {
      this.navigateToShell();
      dispatch(new ChangeUserInfo({name: 'Gast', handicap: 54}));
    }));
  }

  @Action(Register)
  register({ dispatch }: StateContext<AuthStateModel>, { payload }: Register) {
    console.log(payload);
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(payload.email, payload.password)
    );
  }

  @Action(Logout)
  logout({ dispatch }: StateContext<AuthStateModel>) {
    return Observable.fromPromise(
      this.afAuth.auth.signOut()
    )
      .pipe(tap(() => {
        this.fss.unsubscribeAll();
        dispatch(new ResetRoundState());
        this.router.navigate(['login']);
      }));
  }
  navigateToShell() {
    const p = this.params['returnUrl'];
    if (p) {
      this.router.navigate(p.split('/'));
    } else {
      console.log('in else');
      this.router.navigate(['']);
      this.routesub.unsubscribe();
    }
  }

}
