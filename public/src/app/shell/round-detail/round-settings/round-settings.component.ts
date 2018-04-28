import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TryChangeRoundUserInfo, TryDeleteRound } from '../../store/round.actions';
import { Round } from '../../models/round.model';
import { RoundState, UserModel } from '../../store/round.state';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-round-settings',
  templateUrl: './round-settings.component.html',
  styleUrls: ['./round-settings.component.scss']
})
export class RoundSettingsComponent implements OnInit {
  @Input() round: Round;
  @Select(RoundState.currentUsers) users$;
  sub: Subscription;
  user: UserModel = {name: undefined, handicap: undefined};
  constructor(private store: Store, private afAuth: AngularFireAuth) {
    const uid = this.afAuth.auth.currentUser.uid
    this.sub = this.users$.subscribe(us => {
      if (us[uid]) {
        this.user = us[uid];
      } else {
        this.user = {name: undefined, handicap: undefined};
      }
    });
  }

  ngOnInit() {
  }
  onDeleteRound() {
    this.store.dispatch(new TryDeleteRound({id: this.round.id}));
  }
  onChangeUserInfo() {
    if (this.round && this.round.id && this.user.name && this.user.handicap) {
      this.store.dispatch(new TryChangeRoundUserInfo({
        rid: this.round.id,
        uid: this.afAuth.auth.currentUser.uid,
        user: {
          name: this.user.name,
          handicap: this.user.handicap
        }
      }))
    }
  }

}
