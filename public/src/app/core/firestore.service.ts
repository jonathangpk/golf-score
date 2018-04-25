import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngxs/store';
import { AddCoursesState, RemoveCourseState } from '../shell/store/course.actions';
import { ChangeUserInfo } from '../shell/store/user.actions';
import { Subscription } from 'rxjs/Subscription';
import { AddRound } from '../shell/store/round.actions';
import { Round } from '../shell/models/round.model';


@Injectable()
export class FirestoreService {
  subs: Subscription[] = [];
  userSubs: {[id: string]: Subscription} = {};
  roundSubs: {[id: string]: Subscription} = {};
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private store: Store) {
    console.log('service');
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
      if (this.userSubs[k]) {
        this.userSubs[k].unsubscribe();
      }
    }
    for (const k in this.roundSubs) {
      if (this.roundSubs[k]) {
        this.roundSubs[k].unsubscribe();
      }
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
          console.log(n);
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
            console.log(doc);
            this.store.dispatch(new ChangeUserInfo(doc));
          }
        })
    );
  }
  queryUser(uid) {
    this.userSubs[uid] = this.fs.doc(`users/${uid}`).valueChanges()
      .subscribe(doc => {
        console.log('query user uid', doc);
      });
  }
  queryRounds() {
    const uid = this.afAuth.auth.currentUser.uid;
    this.subs.push(
      this.fs.collection(`users/${uid}/rounds`).stateChanges()
        .subscribe(r => {
          r.forEach(e => {
            this.queryRound(uid, e.payload.doc.id);
          });
        })
    );
  }
  queryRound(uid, rid) {
    if (rid) {
      this.roundSubs[rid] = this.fs.doc(`rounds/${rid}`).valueChanges()
        .subscribe((r: Round) => {
          if (r === null) {
            // deleted
          } else {
            r.users
              .filter(id => id !== uid)
              .forEach(id => this.queryUser(id));
            this.store.dispatch(new AddRound({id: rid, ...r}));
          }
        });
    } else {
      console.log('err');
    }
  }
}
