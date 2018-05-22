import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { CourseState } from '../../store/course.state';
import { Observable } from 'rxjs/index';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-courses',
  templateUrl: './profile-courses.component.html',
  styleUrls: ['./profile-courses.component.scss']
})
export class ProfileCoursesComponent implements OnInit {
  @Select(CourseState.userCourses) courses$: Observable<Course[]>;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onDetail(id) {
    this.router.navigate(['profile', 'courses', 'edit', id])
      .catch(err => console.log(err));
  }

}
