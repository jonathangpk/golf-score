import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Register } from '../store/auth.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChangeUserInfo } from '../../shell/store/round.actions';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  name = new FormControl('', [Validators.required]);
  handicap = new FormControl('', [Validators.required, Validators.max(54), Validators.min(-10)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loading = false;
  constructor(private store: Store, private afAuth: AngularFireAuth, private sb: MatSnackBar) {
  }

  ngOnInit() {
  }
  onPwChange() {
  }
  onRegister() {
    if (this.name.valid && this.handicap.valid && this.email.valid
      && this.password.value.length > 7 && this.password.value === this.passwordConfirm.value) {
      this.loading = true;
      this.afAuth.auth.createUserWithEmailAndPassword(this.email.value, this.password.value)
        .then(r => {
          this.loading = false;
          this.store.dispatch(new ChangeUserInfo({name: this.name.value, handicap: this.handicap.value}));
        })
        .catch(err => {
          this.loading = false;
          this.sb.open(err, '', {duration: 3000});
        });
    } else if (this.password.value !== this.passwordConfirm.value) {
      this.sb.open('Passwörter stimmen nicht überein', '', {duration: 5000});
    } else {
          this.sb.open('Korrigiere die falschen Eingaben', '', {duration: 2000});
    }
    // this.registerForm.
    // this.store.dispatch(new Register({name, handicap, email, password}));
  }

}
