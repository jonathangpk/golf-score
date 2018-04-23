import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../../auth/store/auth.actions';
import { ChangeUserInfo } from '../store/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }
  onLogout() {
    this.store.dispatch(new Logout());
  }
  onSafe(name, handicap) {
    this.store.dispatch(new ChangeUserInfo({name, handicap}));
  }

}
