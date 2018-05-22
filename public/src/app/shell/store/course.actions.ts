import { Course } from '../models/course.model';

export class CreateCourse {
  static readonly type = '[Course] New Course';
  constructor(public payload: Course) {}
}
export class AddCoursesState { // to local State
  static readonly type = '[Course] Add Courses to State';
  constructor(public payload: {[id: string]: Course}) {}
}
export class RemoveCourseState {
  static readonly type = '[Course] Remove Course from State';
  constructor(public payload: {id: string}) {}
}

export class SetCurrentCourse {
  static readonly tzpe = '[Course] Set Current Course';
  constructor (public payload: {id: string}) {}
}
