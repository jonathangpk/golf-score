import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Register } from '../store/auth.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChangeUserInfo } from '../../shell/store/round.actions';
import { MatSnackBar } from '@angular/material';
import { PasswordConfirmValidator } from '../../core/password-confirm.validator';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  params: {};
  routeSub: Subscription;
  constructor(private store: Store, private afAuth: AngularFireAuth, private sb: MatSnackBar, private fb: FormBuilder,
              private route: ActivatedRoute, private router: Router, private fs: AngularFirestore) {
    this.createForm();
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }
  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      handicap: ['', [Validators.required, Validators.max(54), Validators.min(-20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8)]],
      passwordConfirm: ['', [Validators.required]],
    }, {
      validator: PasswordConfirmValidator.matchPassword
    });
  }
  ngOnInit() {
  }
  onRegister() {
    console.log(this.registerForm);
    if (this.registerForm.status === 'VALID') {
      this.loading = true;
      const vals = this.registerForm.value;
      this.afAuth.auth.createUserWithEmailAndPassword(vals.email, vals.password)
        .then(user => {
          // TODO Test this!
          console.log(user, user.uid);
          return this.fs.doc(`users/${user.uid}`).set({
            name: vals.name,
            handicap: vals.handicap
          });
        })
        .then(r => {
          this.loading = false;
          this.navigateToShell();
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.sb.open('Name und Hanidcap konnten nicht gespeichert werden', '', {duration: 3000});
          this.navigateToShell();
        });
    } else {
      this.sb.open('Korrigiere die falschen Eingaben', '', {duration: 2000});
    }
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
