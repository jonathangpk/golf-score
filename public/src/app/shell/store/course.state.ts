import { Course } from '../models/course.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddCoursesState, CreateCourse } from './course.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ProgressBarService } from '../progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';


export interface CourseStateModel {
  courses: {
    [id: string]: Course,
  };
}

@State<CourseStateModel>({
  name: 'course',
  defaults: {
    courses: {}
  }
})
export class CourseState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth, private pb: ProgressBarService, private sb: MatSnackBar,
              private location: Location) {}
  @Selector()
  static coursesArray(state: CourseStateModel) {
    const n = [];
    const c = state.courses;
    for (const id in c) {
      if (c[id]) {
        n.push({id, ...c[id]});
      }
    }
    return n;
  }
  @Action(CreateCourse)
  addCoursesToState({ }: StateContext<CourseStateModel>, { payload }: CreateCourse) {
    this.pb.inc();
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.collection(`courses`).add({
        ...payload,
        created: (new Date()).toJSON(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creator: uid
      }).then( r => {
        console.log('course added');
        this.pb.dec();
        this.sb.open('Platz erstellt', '', {duration: 2000});
        this.location.back();
      }).catch((err => {
        this.pb.dec();
        this.sb.open('Fehler: ' + err, '', {duration: 2000});
        console.log(err);
      }))
    );
  }
  @Action(AddCoursesState)
  queryCourses({ getState, patchState }: StateContext<CourseStateModel>, { payload }: AddCoursesState) {
    patchState({
      courses: {
        ...getState().courses,
        ...payload
      }
    });
  }

}
