import { Course } from '../models/course.model';
import { Action, State, StateContext } from '@ngxs/store';
import { AddCoursesState, CreateCourse } from './course.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { StartQuery } from '../../auth/store/auth.actions';
import { tap } from 'rxjs/operators';


export interface CourseStateModel {
  courses: {
    [id: string]: Course,
  };
}

@State<CourseStateModel>({
  name: 'course',
  defaults: {
    courses: {
      'fjsdlkaaf' : {
        name: 'Sdfas',
        city: 'fsdF',
        holes: 1,
        scorecard: {}
      }
    }
  }
})
export class CourseState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {}
  @Action(CreateCourse)
  addCoursesToState({ }: StateContext<CourseStateModel>, { payload }: CreateCourse) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.collection(`courses`).add({
        ...payload,
        created: (new Date()).toJSON(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        creator: uid
      }).then( r => console.log('course added'))
        .catch((err => console.log(err)))
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
