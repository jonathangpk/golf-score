import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoginAnon, LoginEmail, LoginGoogle } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onLoginGoogle() {
    this.store.dispatch(new LoginGoogle());
  }
  onLoginAnon() {
    this.store.dispatch(new LoginAnon());
  }
  onLoginEmail(email, password) {
    this.store.dispatch(new LoginEmail({email: email, password: password}));
  }

}


