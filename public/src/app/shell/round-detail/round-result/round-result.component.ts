import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { RoundState, ScoreSummary, UserModel } from '../../store/round.state';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { Round } from '../../models/round.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-round-result',
  templateUrl: './round-result.component.html',
  styleUrls: ['./round-result.component.scss']
})
export class RoundResultComponent implements OnInit, OnDestroy {
  sub: Subscription;
  @Select(state => state.course.courses) courses$: Observable<Course>;
  @Select(RoundState.currentRound) round$: Observable<Round>;
  @Select(RoundState.currentScores) scores$: Observable<{[id: string]: number}>;
  @Select(RoundState.currentUsers) users$: Observable<{[id: string]: UserModel}>;
  summary$ = Observable.combineLatest(this.courses$, this.round$, this.scores$, this.users$,
    (courses, round, scores, users) => {
      if (round) {
        const course = courses[round.course];
        if (!course || !scores) {
          this.sb.open('Noch nicht alle daten geladen', '', {duration: 2000});
          return [];
        }
        const results = this.getResults(scores, course, users);
        console.log(results);
        // this.userSummary = results.find(e => e.uid === this.afAuth.auth.currentUser.uid);
        return results
          .sort((a, b) => a.brutto - b.brutto);
      } else { return []; }
  });
  constructor(private sb: MatSnackBar, private afAuth: AngularFireAuth) {
    this.sub = this.scores$.subscribe(e => {console.log('scores', e); });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  ngOnInit() {
  }
  getResults(s, course, users): ScoreSummary[] {
    const ret = [];
    for (const k in s) {
      if (!s[k] || !users[k]) { continue; }
      ret.push({
        uid: k,
        name: users[k].name,
        uhandicap: users[k].handicap,
        ...this.getResultFromScore(s[k], course, users[k].handicap)
      });
    }
    return ret;
  }
  getResultFromScore(s, course: Course, hcp) {
    let brutto, netto, diff;
    const vg = -this.getSpielvorgabe(hcp, course.slope, course.cr, course.par);
    const sum = {brutto: 0, netto: 0, diff: 0, scorecard: []};
    for (const k in s) {
      if (!s[k]) { continue; }
      brutto = Math.max(0, course.scorecard[k].par - s[k] + 2);
      const vor = Math.floor(vg / 18) + ((course.scorecard[k].hcp <= vg % 18) ? 1 : 0);
      netto = Math.max(0, vor + course.scorecard[k].par - s[k] + 2);
      diff = s[k] - course.scorecard[k].par;
      sum.brutto += brutto;
      sum.netto += netto;
      sum.diff += diff;
      sum.scorecard.push({brutto, netto, score: s[k], par: course.scorecard[k].par, hole: k});
    }
    return sum;
  }
  getSpielvorgabe (hcp: number, slope: number, cr: number, par: number) {
    return Math.round(Math.max(-hcp, -36) * (slope / 113) - cr + par);
  }
  getNettoPunkte(course: Course, s, handicap) {
    const vg = -this.getSpielvorgabe(handicap, course.slope, course.cr, course.par);
    let arr = [];
    for (const k in s) {
      if (!s[k]) { continue; }
      arr.push({score: s[k], hole: k, par: course.scorecard[k].par, hcp: course.scorecard[k].hcp});
    }
    arr = arr.sort((a, b) => a.hcp - b.hcp);

    console.log(arr);
    return {};
  }

}
