import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCourse } from '../store/course.actions';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {
  course: Course = {name: '', city: '', holes: 9, scorecard: {}};
  holesIter: any[] = new Array(9);
  constructor(private store: Store) { }

  ngOnInit() {
  }
  onCreateCourse() {
    console.log(this.course);
    this.store.dispatch(new CreateCourse(this.course));
  }

}
