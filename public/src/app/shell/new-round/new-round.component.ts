import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TryAddRound } from '../store/round.actions';
import { Observable } from 'rxjs/Observable';
import { Course } from '../models/course.model';
import { CourseState } from '../store/course.state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-new-round',
  templateUrl: './new-round.component.html',
  styleUrls: ['./new-round.component.scss']
})
export class NewRoundComponent implements OnInit, OnDestroy {
  @Select(CourseState.coursesArray) courses$: Observable<Course[]>;
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  searchString = '';
  sub: Subscription;
  constructor(private store: Store) {
    this.sub = this.courses$.subscribe(r => {
      this.courses = r;
      console.log('courses change');
      this.onCourseInputChange(this.searchString);
    });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onCreateRound(name, course) {
    this.store.dispatch(new TryAddRound({name, course}));
  }
  onCourseInputChange(s) {
    this.searchString = s;
    this.filteredCourses = this.courses.filter(c => c.name.toLowerCase().startsWith(s.toLowerCase()));
  }

}
