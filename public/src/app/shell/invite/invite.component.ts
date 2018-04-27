import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngxs/store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TryAddRound } from '../store/round.actions';


@Component({
  selector: 'app-invite',
  template: 'Runde wird hinzugefügt'
})
export class InviteComponent implements OnDestroy {
  routeSub: Subscription;
  constructor(private route: ActivatedRoute, private store: Store) {
    this.routeSub = this.route.paramMap
      .subscribe((params: ParamMap) => {
        console.log(params.get('id'));
        this.store.dispatch(new TryAddRound({id: params.get('id')}));
      });
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
