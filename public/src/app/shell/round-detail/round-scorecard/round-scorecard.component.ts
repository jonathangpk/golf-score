import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Round } from '../../models/round.model';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { RoundState } from '../../store/round.state';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/observable/combineLatest';
import { TryChangeScore } from '../../store/round.actions';

@Component({
  selector: 'app-round-scorecard',
  templateUrl: './round-scorecard.component.html',
  styleUrls: ['./round-scorecard.component.scss']
})
export class RoundScorecardComponent implements OnInit {
  scorecard: {par: number, dis: number, score: number}[] = [{par: 1, dis: 12, score: 1}];
  roundid: string;
  @Select(state => state.course.courses) courses$: Observable<{[id: string]: Course}>;
  @Select(RoundState.currentRound) round$: Observable<Round>;
  scorecard$ = Observable.combineLatest(this.courses$, this.round$, (courses, round) => {
      if (round) {
        const course = courses[round.course];
        if (!course) {
          this.sb.open('Plätze sind noch nicht geladen', '', {duration: 2000});
          return [];
        }
        this.roundid = round.id;
        const scorecard = round.scores ? round.scores[this.afAuth.auth.currentUser.uid] : {};
        const ret = [];
        for (let i = 0; i < course.holes; i++) {
          ret[i] = {};
          if (scorecard[i]) {
            ret[i].score = scorecard[i];
          } else {
            ret[i].score = course.scorecard[i].par;
          }
          ret[i].par = course.scorecard[i].par;
          ret[i].dis = course.scorecard[i].dis;
        }
        return ret;
      } else {
        return [];
      }
    });
  constructor(private afAuth: AngularFireAuth, private sb: MatSnackBar, private store: Store) {
    this.round$.subscribe(r => console.log(r));
    this.scorecard$.subscribe(r => {
      this.scorecard = r;
    });
  }

  ngOnInit() {
  }
  onSafeScorecard() {
    const score = {};
    for (let i = 0; i < this.scorecard.length; i++) {
      score[i] = this.scorecard[i].score;
    }
    this.store.dispatch(new TryChangeScore({rid: this.roundid, score}));
  }

}

/*
if (round) {
      const course = courses[round.course];
      if (!course) {
        this.sb.open('Plätze sind noch nicht geladen', '', {duration: 2000 });
        return [];
      }
      const scorecard = round.scorecard;
      const ret = [];
      for (let i = 0; i < course.holes; i++) {
        ret[i] = {};
        if (scorecard[i]) {
          ret[i].score = scorecard[i];
        } else {
          ret[i].score = course.scorecard[i].par;
        }
        ret[i].par = course.scorecard[i].par;
        ret[i].dis = course.scorecard[i].dis;
      }
      return ret;
    } else {
      return [];
    }
 */
