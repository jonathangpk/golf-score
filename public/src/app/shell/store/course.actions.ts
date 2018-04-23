import { Course } from '../models/course.model';

export class CreateCourse {
  static readonly type = '[Course] New Course';
  constructor(public payload: Course) {}
}
