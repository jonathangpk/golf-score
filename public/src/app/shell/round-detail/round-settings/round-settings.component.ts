import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TryDeleteRound } from '../../store/round.actions';
import { Round } from '../../models/round.model';

@Component({
  selector: 'app-round-settings',
  templateUrl: './round-settings.component.html',
  styleUrls: ['./round-settings.component.scss']
})
export class RoundSettingsComponent implements OnInit {
  @Input() round: Round;
  constructor(private store: Store) { }

  ngOnInit() {
  }
  onDeleteRound() {
    this.store.dispatch(new TryDeleteRound({id: this.round.id}));
  }

}
