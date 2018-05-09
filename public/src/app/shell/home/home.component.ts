import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Round } from '../models/round.model';
import { Router } from '@angular/router';
import { Course } from '../models/course.model';
import { Subscription } from 'rxjs/Subscription';
import { RoundState } from '../store/round.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(RoundState.sortedRounds) rounds$: Observable<Round[]>;
  @Select(state => state.course.courses) courses$: Observable<{[id: string]: Course}>;
  sub: Subscription;
  courses: {[id: string]: Course} = {};
  constructor(private router: Router) {
    this.sub = this.courses$.subscribe(r => this.courses = r);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit() {
  }
  onRoundDetail(id) {
    this.router.navigate(['round', id]);
  }
}
