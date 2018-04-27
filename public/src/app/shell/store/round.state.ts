import { Round, Score } from '../models/round.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddRound,
  ChangeScore,
  DeleteRound,
  SetCurrentRound,
  TryAddRound,
  TryChangeScore,
  TryCreateRound,
  TryDeleteRound
} from './round.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from '@firebase/app';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


export interface RoundStateModel {
  rounds: Round[];
  currentRound: string;
  scores: {[rid: string]: {[uid: string]: Score}};
}

@State<RoundStateModel>({
  name: 'round',
  defaults: {
    rounds: [],
    currentRound: '',
    scores: {}
  }
})
export class RoundState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private sb: MatSnackBar, private router: Router) {
  }
  @Action(SetCurrentRound)
  setCurrentRound({ patchState }: StateContext<RoundStateModel>, { payload }: SetCurrentRound) {
    patchState({
      currentRound: payload.id
    });
  }
  @Action(TryCreateRound)
  tryCreateRound({dispatch}: StateContext<RoundStateModel>, { payload }: TryCreateRound) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.collection('rounds').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        created: new Date().toJSON(),
        creator: uid,
        users: [uid],
        ...payload
      }).then(r => {
        return dispatch(new TryAddRound({id: r.id}));
      })
    );
  }
  @Action(TryAddRound)
  tryAddRound({}: StateContext<RoundStateModel>, { payload }: TryAddRound) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.doc(`rounds/${payload.id}/users/${uid}`).set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(r => {
        return this.fs.doc(`users/${uid}/rounds/${payload.id}`).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      }).then(r => {
        this.router.navigate(['round', payload.id]);
      })
        .catch(err => {
        this.sb.open(err, '',  {
          duration: 3000
        });
      })
    );
  }
  @Action(TryDeleteRound)
  tryDeleteRound({}: StateContext<RoundStateModel>, { payload }: TryDeleteRound) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.doc(`rounds/${payload.id}/users/${uid}`).delete()
        .then( r => {
          return this.fs.doc(`users/${uid}/rounds/${payload.id}`).delete();
        })
        .then(r => {
          this.router.navigate(['']);
          return this.sb.open('Gelöscht', '', { duration: 2000});
        })
        .catch(err => this.sb.open(err, '', { duration: 3000}))
    );
  }
  @Action(AddRound)
  addRound({getState, patchState}: StateContext<RoundStateModel>, { payload }: AddRound) {
    patchState({
      rounds: getState().rounds
        .filter(e => e.id !== payload.id)
        .concat([payload])
    });
  }
  @Action(DeleteRound)
  deleteRound({getState, patchState}: StateContext<RoundStateModel>, { payload }: DeleteRound) {
    patchState({
      rounds: getState().rounds.filter(e => e.id !== payload.id)
    });
  }
  @Action(TryChangeScore)
  tryChangeScore({ }: StateContext<RoundStateModel>, { payload }: TryChangeScore) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.doc(`rounds/${payload.rid}/scores/${uid}`).set(payload.score)
        .then(r => this.sb.open('Gespeichert', '', {duration: 700}))
        .catch(e => this.sb.open('Es ist ein Fehler aufgetreten'))
    );
  }
  @Action(ChangeScore)
  changeScore({ getState, patchState }: StateContext<RoundStateModel>, { payload }: ChangeScore) {
    const scores = {...getState().scores}
    if (!scores[payload.rid]) { scores[payload.rid] = {}; }
    scores[payload.rid][payload.uid] = payload.score;
    patchState({scores});
  }

  @Selector()
  static currentRound(state: RoundStateModel) {
    return state.rounds.filter(e => e.id === state.currentRound)[0];
  }
  @Selector()
  static currentScores(state: RoundStateModel) {
    if (state.currentRound) {
      return state.scores[state.currentRound] ? state.scores[state.currentRound] : {};
    } else {
      return {};
    }
  }
}
