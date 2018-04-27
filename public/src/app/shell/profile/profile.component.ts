import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../auth/store/auth.actions';
import { TryChangeUserInfo } from '../store/user.actions';
import { UserModel, UserState } from '../store/user.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Select(UserState.localUser) user$: Observable<UserModel>;
  constructor(private store: Store) { }

  ngOnInit() {
  }
  onLogout() {
    this.store.dispatch(new Logout());
  }
  onSafe(name, handicap) {
    this.store.dispatch(new TryChangeUserInfo({name, handicap}));
  }

}
