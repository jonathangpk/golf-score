import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Register } from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }
  onRegister(name, handicap, email, password) {
    this.store.dispatch(new Register({name, handicap, email, password}));
  }

}
