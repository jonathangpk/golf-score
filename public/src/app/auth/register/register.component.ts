import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Register } from '../store/auth.actions';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChangeUserInfo } from '../../shell/store/round.actions';
import { MatSnackBar } from '@angular/material';
import { PasswordConfirmValidator } from '../../core/password-confirm.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  constructor(private store: Store, private afAuth: AngularFireAuth, private sb: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
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
        .then(r => {
          this.loading = false;
          this.store.dispatch(new ChangeUserInfo({name: vals.name, handicap: vals.handicap}));
        })
        .catch(err => {
          this.loading = false;
          this.sb.open(err, '', {duration: 3000});
        });
    } else {
      this.sb.open('Korrigiere die falschen Eingaben', '', {duration: 2000});
    }
  }

}
