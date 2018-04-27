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
  course: Course = {name: '', city: '', holes: 9, cr: 72, slope: 113, par: 72, scorecard: this._getDefaultScorecard(9)};
  holesIter: any[] = new Array(9);
  maxholes = 9
  constructor(private store: Store) { }

  ngOnInit() {
  }
  onCreateCourse() {
    console.log(this.course);

    // making sure Scorecard is not bigger than the Course (hole count)
    const create = this.course;
    const scorecard = {};
    for (let i = 0; i < create.holes; i++) {
      scorecard[i] = create.scorecard[i];
    }
    create.scorecard = scorecard;
    this.store.dispatch(new CreateCourse(create));
  }
  onHolesChange() {
    const currSize = this.course.holes;
    if (currSize > this.maxholes) {
      this.maxholes = currSize;
      this.course.scorecard = {
        ...this._getDefaultScorecard(currSize),
        ...this.course.scorecard
      };
    }
    this.holesIter = new Array(this.course.holes);
  }
  _getDefaultScorecard(size) {
    const ret = {}
    for (let i = 0; i < size; i++) {
      ret[i] = {dis: undefined, par: undefined, hcp: undefined};
    }
    return ret;
  }

}
