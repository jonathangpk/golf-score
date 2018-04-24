import { Action, State, StateContext } from '@ngxs/store';
import { ChangeUserInfo, TryChangeUserInfo } from './user.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

export interface UsersStateModel {
  user: {
    name: string;
    handicap: number;
  },
  users: {
    name: string;
    handicap: number;
  }[];
}

@State<UsersStateModel>({
  name: 'user',
  defaults: {
    user: null,
    users: []
  }
})
export class UsersState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {}
  @Action(TryChangeUserInfo)
  tryChangeUserInfo({ patchState }: StateContext<UsersStateModel>, { payload }: TryChangeUserInfo) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.doc(`users/${uid}`).set(payload)
    );
  }
  @Action(ChangeUserInfo)
  changeUserInfo({ patchState }: StateContext<UsersStateModel>, { payload }: ChangeUserInfo) {
    patchState({
      user: {
        ...payload
      }
    });
  }
}
