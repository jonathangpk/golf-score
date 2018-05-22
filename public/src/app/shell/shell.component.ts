import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { FirestoreService } from '../core/firestore.service';
import { ProgressBarService } from './progress-bar.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shell',
  template: `
    <div class="container">
      <mat-toolbar color="primary" style="display: flex; justify-content: space-between">
        <div routerLink="/">Golf Score</div>
        <button mat-icon-button routerLink="/profile"><mat-icon>account_circle</mat-icon></button>
      </mat-toolbar>
      <mat-progress-bar style="position: fixed; top: 0; z-index: 100;" 
                        [ngStyle]="{'display': loading ? 'block' : 'none'}" mode="indeterminate"></mat-progress-bar>
      <router-outlet></router-outlet>
      <div style="width: 100%; text-align: center;"><a routerLink="/legal" style="color: #666; font-size: 12px">Impressum</a></div>
    </div>
  `,
  styles: [
    `.container {
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
    }`
  ]
})
export class ShellComponent implements OnDestroy{
  loading = false;
  loadSub: Subscription;
  constructor(private store: Store, private fss: FirestoreService, private pbs: ProgressBarService) {
    this.fss.queryAll();
    this.loadSub = this.pbs.progressEmitter.subscribe(l => this.loading = l);
  }
  ngOnDestroy() {
    this.loadSub.unsubscribe();
  }
}
