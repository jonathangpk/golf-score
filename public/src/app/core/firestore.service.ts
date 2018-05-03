import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngxs/store';
import { AddCoursesState, RemoveCourseState } from '../shell/store/course.actions';
import { Subscription } from 'rxjs/Subscription';
import { AddRound, ChangeRoundUserInfo, ChangeScore, ChangeUserInfo, DeleteRound } from '../shell/store/round.actions';
import { Round } from '../shell/models/round.model';
import { ProgressBarService } from '../shell/progress-bar.service';


@Injectable()
export class FirestoreService {
  subs: Subscription[] = [];
  userSubs: {[id: string]: Subscription} = {};
  roundSubs: {[id: string]: Subscription} = {};
  scoreSubs: {[id: string]: Subscription} = {};
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private store: Store) {
  }
  queryAll() {
    this.queryCourses();
    this.queryLogedInUser();
    this.queryRounds();
  }
  unsubscribeAll() {
    console.log('Firestore ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
    for (const k in this.userSubs) {
      if (this.userSubs[k]) { this.userSubs[k].unsubscribe(); }
    }
    for (const k in this.roundSubs) {
      if (this.roundSubs[k]) { this.roundSubs[k].unsubscribe(); }
    }
    for (const k in this.scoreSubs) {
      if (this.scoreSubs[k]) { this.scoreSubs[k].unsubscribe(); }
    }
  }
  queryCourses() {
    this.subs.push(
      this.fs.collection('courses').stateChanges()
        .subscribe(r => {
          const n = {};
          r.forEach(e => {
            if (e.type === 'removed') {
              this.store.dispatch(new RemoveCourseState({id: e.payload.doc.id}));
            } else {
              n[e.payload.doc.id] = e.payload.doc.data();
            }
          });
          this.store.dispatch(new AddCoursesState(n));
        })
    );
  }
  queryLogedInUser() {
    const uid = this.afAuth.auth.currentUser.uid;
    this.subs.push(
      this.fs.doc(`users/${uid}`).valueChanges()
        .subscribe((doc: {name: string, handicap: number}) => {
          if (doc) {
            this.store.dispatch(new ChangeUserInfo(doc));
          }
        })
    );
  }
  /*queryUser(uid) {
    this.userSubs[uid] = this.fs.doc(`users/${uid}`).valueChanges()
      .subscribe(doc => {
        console.log('query user uid', doc);
      });
  }*/
  queryRounds() {
    const uid = this.afAuth.auth.currentUser.uid;
    this.subs.push(
      this.fs.collection(`users/${uid}/rounds`).stateChanges()
        .subscribe(r => {
          r.forEach(e => {
            if (e.payload.type === 'removed') {
              this.roundSubs[e.payload.doc.id].unsubscribe();
              this.store.dispatch(new DeleteRound({id: e.payload.doc.id}));
            } else {
              this.queryRound(uid, e.payload.doc.id);
            }
          });
        })
    );
  }
  queryRound(uid, rid) {
    if (rid) {
      this.roundSubs[rid] = this.fs.doc(`rounds/${rid}`).valueChanges()
        .subscribe((r: Round) => {
          if (r === null) {
            this.store.dispatch(new DeleteRound({id: rid}));
          } else {
            this.store.dispatch(new AddRound({id: rid, ...r}));
            this.queryScores(rid);
            this.queryUsersFromRound(rid);
          }
        });
    } else {
      console.log('err');
    }
  }
  queryScores(rid) {
    if (!rid) { return; }
    this.scoreSubs[rid] = this.fs.collection(`rounds/${rid}/scores`).stateChanges()
      .subscribe(r => {
        r.forEach(s => {
          this.store.dispatch(new ChangeScore({
            rid: rid,
            uid: s.payload.doc.id,
            score: s.payload.doc.data()
          }));
        });
      });
  }
  queryUsersFromRound(rid) {
    if (!rid) {return; }
    this.userSubs[rid] = this.fs.collection(`rounds/${rid}/users`).stateChanges()
      .subscribe(r => {
        r.forEach(e => {
          this.store.dispatch(new ChangeRoundUserInfo({
            rid: rid,
            uid: e.payload.doc.id,
            user: {
              name: e.payload.doc.data().name,
              handicap: e.payload.doc.data().handicap
            }
          }));
        });
      });

  }
}
