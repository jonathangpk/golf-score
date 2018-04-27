import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ChangeUserInfo, TryChangeUserInfo } from './user.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
export interface UserModel {
  name: string;
  handicap: number;
}
export interface UserStateModel {
  user: UserModel,
  users: {
    name: string;
    handicap: number;
  }[];
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
    users: []
  }
})
export class UserState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {}
  @Action(TryChangeUserInfo)
  tryChangeUserInfo({ patchState }: StateContext<UserStateModel>, { payload }: TryChangeUserInfo) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.doc(`users/${uid}`).set(payload)
    );
  }
  @Action(ChangeUserInfo)
  changeUserInfo({ patchState }: StateContext<UserStateModel>, { payload }: ChangeUserInfo) {
    patchState({
      user: {
        ...payload
      }
    });
  }
  @Selector()
  static localUser(state: UserStateModel) {
    return state.user;
  }
}
