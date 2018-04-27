import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Logout } from '../../auth/store/auth.actions';
import { Observable } from 'rxjs/Observable';
import { TryChangeUserInfo } from '../store/round.actions';
import { RoundState, UserModel } from '../store/round.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  @Select(RoundState.localUser) user$: Observable<UserModel>;
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
