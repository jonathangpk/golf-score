import { Round } from '../models/round.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddRound, SetCurrentRound, TryAddRound } from './round.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from '@firebase/app';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


export interface RoundStateModel {
  rounds: Round[];
  currentRound: string;
}

@State<RoundStateModel>({
  name: 'round',
  defaults: {
    rounds: [],
    currentRound: ''
  }
})
export class RoundState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private sb: MatSnackBar, private router: Router) {}
  @Action(SetCurrentRound)
  setCurrentRound({ patchState }: StateContext<RoundStateModel>, { payload }: SetCurrentRound) {
    patchState({
      currentRound: payload.id
    });
  }
  @Action(TryAddRound)
  tryAddRound({}: StateContext<RoundStateModel>, { payload }: TryAddRound) {
    const uid = this.afAuth.auth.currentUser.uid;
    let rid = '';
    return Observable.fromPromise(
      this.fs.collection('rounds').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        created: new Date().toJSON(),
        creator: uid,
        users: [uid],
        ...payload
      }).then(r => {
        rid = r.id;
        return this.fs.doc(`users/${uid}/rounds/${r.id}`).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          name: payload.name,
          course: payload.course
        });
      }, err => {
        console.log(err);
        return Promise.reject(err);
      })
      .then(r => {
        this.router.navigate(['round', rid]);
      })
      .catch(err => {
        this.sb.open(err, '',  {
          duration: 3000
        });
      })
    );
  }
  @Action(AddRound)
  addRound({getState, patchState}: StateContext<RoundStateModel>, { payload }: AddRound) {
    const n = getState().rounds;
    n.push(payload);
    patchState({
      rounds: n
    });
  }
  @Selector()
  static currentRound(state: RoundStateModel) {
    return state.rounds.filter(e => e.id === state.currentRound)[0];
  }
}
