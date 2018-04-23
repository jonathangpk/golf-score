import { Course } from '../models/course.model';
import { Action, State, StateContext } from '@ngxs/store';
import { CreateCourse } from './course.actions';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


export interface CourseStateModel {
  courses: Course[];
}

@State<CourseStateModel>({
  name: 'course',
  defaults: {
    courses: []
  }
})
export class CourseState {
  constructor(private fs: AngularFirestore, private afAuth: AngularFireAuth) {}
  @Action(CreateCourse)
  createCourse({ }: StateContext<CourseStateModel>, { payload }: CreateCourse) {
    const uid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(
      this.fs.collection(`courses`).add({
        ...payload,
        created: (new Date()).toJSON(),
        creator: uid
      }).then( r => console.log('course added'))
        .catch((err => console.log(err)))
    );
  }
}
