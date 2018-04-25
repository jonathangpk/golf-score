import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { Round } from '../models/round.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(state => state.round.rounds) rounds$: Observable<Round[]>;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  onRoundDetail(id) {
    this.router.navigate(['round', id]);
  }
}
