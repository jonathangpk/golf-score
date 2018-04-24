import { Round } from '../models/round.model';
import { Action, State, StateContext } from '@ngxs/store';
import { TryAddRound } from './round.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from '@firebase/app';


export interface RoundStateModel {
  rounds: Round[];
}

@State<RoundStateModel>({
  name: 'round',
  defaults: {
    rounds: []
  }
})
export class RoundState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {}
  @Action(TryAddRound)
  tryAddRound({}: StateContext<RoundStateModel>, { payload }: TryAddRound) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.collection('rounds').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        created: new Date().toJSON(),
        users: [uid],
        ...payload
      }).then(r => {
        return this.fs.doc(`users/${uid}/rounds/${r.id}`).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          name: payload.name,
          course: payload.course
        });
      }, err => {
        console.log(err);
        return Promise.reject(err);
      })
      .then(r => console.log(r))
      .catch(err => console.log(err))
    );
  }
}
