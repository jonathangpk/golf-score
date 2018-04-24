import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TryAddRound } from '../store/round.actions';

@Component({
  selector: 'app-new-round',
  templateUrl: './new-round.component.html',
  styleUrls: ['./new-round.component.scss']
})
export class NewRoundComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }
  onCreateRound(name, course) {
    this.store.dispatch(new TryAddRound({name, course}));
  }

}
