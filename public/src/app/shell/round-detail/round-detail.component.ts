import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SetCurrentRound } from '../store/round.actions';
import { RoundState } from '../store/round.state';
import { Observable } from 'rxjs/Observable';
import { Round } from '../models/round.model';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.scss']
})
export class RoundDetailComponent implements OnInit, OnDestroy {
  @Select(RoundState.currentRound) round$: Observable<Round>;
  routeSub: Subscription;
  constructor(private store: Store, private route: ActivatedRoute) {
    this.routeSub = this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.store.dispatch(new SetCurrentRound({id: params.get('id')}));
        return null;
      });
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
