import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs/index';
import { SetCurrentCourse } from '../../store/course.actions';
import { Course } from '../../models/course.model';
import { CourseState } from '../../store/course.state';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { ProgressBarService } from '../../progress-bar.service';
import { MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {
  course: Course;
  routeSub: Subscription;
  courseSub: Subscription;
  maxholes;
  holesIter = [];
  @Select(CourseState.currentCourse) course$: Observable<Course | undefined>;
  constructor(private store: Store, private route: ActivatedRoute, private fs: AngularFirestore,
              private pb: ProgressBarService, private sb: MatSnackBar, private location: Location) {
    this.routeSub = this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.store.dispatch(new SetCurrentCourse({id: params.get('id')}));
        return null;
      });
    this.courseSub = this.course$.subscribe(c => {
      if (c) {
        this.course = c;
        this.maxholes = this.course.holes;
        this.holesIter = new Array(this.course.holes);
      }
    });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.courseSub.unsubscribe();
  }
  ngOnInit() {
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
  onEditCourse() {
    this.pb.inc();
    this.fs.doc(`courses/${this.course.id}`).set({
      ...this.course,
      lastedit: firebase.firestore.FieldValue.serverTimestamp(),
    }).then( r => {
      console.log('course added');
      this.pb.dec();
      this.sb.open('Gespiechert', '', {duration: 2000});
    }).catch((err => {
      this.pb.dec();
      this.sb.open('Fehler: ' + err, '', {duration: 2000});
      console.log(err);
    }));
  }
  onDelete() {
    this.pb.inc();
    this.fs.doc(`courses/${this.course.id}`).delete()
      .then( r => {
      console.log('course added');
      this.pb.dec();
      this.sb.open('Gelöscht', '', {duration: 2000});
      this.location.back();
    }).catch((err => {
      this.pb.dec();
      this.sb.open('Fehler: ' + err, '', {duration: 2000});
      console.log(err);
    }));
  }
  _getDefaultScorecard(size) {
    const ret = {}
    for (let i = 0; i < size; i++) {
      ret[i] = {dis: undefined, par: undefined, hcp: undefined};
    }
    return ret;
  }
}
