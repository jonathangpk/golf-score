import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginAnon, LoginEmail, LoginGoogle } from '../store/auth.actions';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store, private afAuth: AngularFireAuth, private sb: MatSnackBar, private router: Router,
              private route: ActivatedRoute) {
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }
  hidePassword = true;
  params: {};
  loading = false;
  routeSub: Subscription;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  ngOnInit() {
  }

  onLoginGoogle() {
    this.loading = true;
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then( r => {
        this.loading = false;
        this.navigateToShell();
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
        this.sb.open('Login mit Google fehlgeschlagen', '', {duration: 3000});
      });
  }
  onLoginAnon() {
    this.loading = true;
    this.afAuth.auth.signInAnonymously()
      .then(r => {
        this.loading = false;
        this.navigateToShell();
      })
      .catch(err => {
        this.loading = false;
        this.sb.open('Einloggen fehlgeschlagen', '', {duration: 2000});
        console.log(err);
      });
  }
  onLoginEmail(email, password) {
    this.loading = true;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(r => {
        this.loading = false;
        this.navigateToShell();
      })
      .catch(err => {
        this.loading = false;
        console.log(err);
        if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-email') {
          this.email.setErrors({'incorrect': true});
        } else if (err.code === 'auth/wrong-password') {
          this.password.setErrors({'incorrect': true});
        } else if (err.code === 'auth/user-disabled') {
          this.sb.open('Ihr Account ist aktuell deaktiviert', '', {duration: 2000});
        } else {
          this.sb.open('Einloggen fehlgeschlagen', '', {duration: 2000});
        }
      });
  }
  navigateToShell() {
    const p = this.params['returnUrl'];
    if (p) {
      this.router.navigate(p.split('/'));
    } else {
      console.log('in else');
      this.routeSub.unsubscribe();
      this.router.navigate(['']);
    }
  }
}


