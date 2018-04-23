import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateCourse } from '../store/course.actions';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }
  onCreateCourse(name, city, holes) {
    this.store.dispatch(new CreateCourse({name, city, holes, scorecard: {1: {par: 1, handicap: 1}}}));
  }

}
