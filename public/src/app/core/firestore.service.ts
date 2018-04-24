import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Store } from '@ngxs/store';
import { AddCoursesState, RemoveCourseState } from '../shell/store/course.actions';
import { ChangeUserInfo } from '../shell/store/user.actions';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class FirestoreService {
  subs: Subscription[] = [];
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private store: Store) {
    console.log('service');
  }
  queryAll() {
    this.queryCourses();
    this.queryUser();
    this.queryRounds()
  }
  unsubscribeAll() {
    console.log('Firestore ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
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
  queryUser() {
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
  queryUsers() {

  }
  queryRounds() {
    const uid = this.afAuth.auth.currentUser.uid;
    this.subs.push(
      this.fs.collection(`users/${uid}/rounds`).stateChanges()
        .subscribe(r => {

        })
    )
  }
}
