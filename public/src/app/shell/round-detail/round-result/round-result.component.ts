import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { RoundState, ScoreSummary, UserModel } from '../../store/round.state';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { Round } from '../../models/round.model';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import { CopyService } from '../../../core/copy.service';
// TODO: When sorting hava a second sort parameter for same results + shared places!
@Component({
  selector: 'app-round-result',
  templateUrl: './round-result.component.html',
  styleUrls: ['./round-result.component.scss']
})
export class RoundResultComponent implements OnInit, OnDestroy {
  summary: ScoreSummary[] = [];
  scorecard: ScoreSummary = null;
  sortSummaryBy = 'netto';
  sub: Subscription;
  roundId: string;
  @Select(state => state.course.courses) courses$: Observable<Course>;
  @Select(RoundState.currentRound) round$: Observable<Round>;
  @Select(RoundState.currentScores) scores$: Observable<{[id: string]: number}>;
  @Select(RoundState.currentUsers) users$: Observable<{[id: string]: UserModel}>;
  summary$ = Observable.combineLatest(this.courses$, this.round$, this.scores$, this.users$,
    (courses, round, scores, users) => {
      if (round) {
        this.roundId = round.id;
        const course = courses[round.course];
        if (!course || !scores) {
          this.sb.open('Noch nicht alle daten geladen', '', {duration: 2000});
          return [];
        }
        const results = this.getResults(scores, course, users);
        // this.userSummary = results.find(e => e.uid === this.afAuth.auth.currentUser.uid);
        if (this.sortSummaryBy === 'diff') {
          return results.sort((a, b) => a.diff - b.diff);
        } else {
          return results.sort((a, b) => b[this.sortSummaryBy] - a[this.sortSummaryBy]);
        }
      } else { return []; }
  });
  constructor(private sb: MatSnackBar, private afAuth: AngularFireAuth, private cs: CopyService) {
    this.sub = this.summary$.subscribe(r => {
      this.summary = r;
      this.scorecard = r.find(e => e.uid === this.afAuth.auth.currentUser.uid);
    });
  }
  ngOnDestroy() {
  }
  ngOnInit() {
  }
  getUrl() {
    return this.roundId ? `${environment.targetUrl}/invite/${this.roundId}` : '';
  }
  onCopyUrl() {
    this.cs.copy(this.getUrl());
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
    const sum = {brutto: 0, netto: 0, diff: 0, score: 0, par: course.par, scorecard: []};
    for (const k in s) {
      if (!s[k]) { continue; }
      if (!course.scorecard[k]) {
        console.log('no scorecard');
        continue;
      }
      brutto = Math.max(0, course.scorecard[k].par - s[k] + 2);
      const vor = Math.floor(vg / 18) + ((course.scorecard[k].hcp <= vg % 18) ? 1 : 0);
      netto = Math.max(0, vor + course.scorecard[k].par - s[k] + 2);
      diff = s[k] - course.scorecard[k].par;
      sum.brutto += brutto;
      sum.netto += netto;
      sum.diff += diff;
      sum.score += s[k];
      sum.scorecard.push({brutto, netto, score: s[k], par: course.scorecard[k].par, hole: k, hcp: course.scorecard[k].hcp});
    }
    return sum;
  }
  getSpielvorgabe (hcp: number, slope: number, cr: number, par: number) {
    return Math.round(-hcp * (slope / 113) - cr + par);
  }
  onSortTypeChange() {
    if (this.sortSummaryBy === 'diff') {
      this.summary = this.summary.sort((a, b) => a.diff - b.diff);
    } else {
      this.summary = this.summary.sort((a, b) => b[this.sortSummaryBy] - a[this.sortSummaryBy]);
    }
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
  iosCopyToClipboard(el) {
    const oldContentEditable = el.contentEditable,
      oldReadOnly = el.readOnly,
      range = document.createRange();

    el.contenteditable = true;
    el.readonly = false;
    range.selectNodeContents(el);

    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand('copy');
  }


}
