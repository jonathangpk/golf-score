import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { StartQuery } from '../auth/store/auth.actions';
import { FirestoreService } from '../core/firestore.service';

@Component({
  selector: 'app-shell',
  template: `
    <div class="container">
      <mat-toolbar color="primary" style="display: flex; justify-content: space-between">
        <div routerLink="/">Golf Score</div>
        <button mat-icon-button routerLink="/profile"><mat-icon>account_circle</mat-icon></button>
      </mat-toolbar>
      <router-outlet></router-outlet>
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
export class ShellComponent {
  constructor(private store: Store, private fss: FirestoreService) {
    this.fss.queryAll();
  }
}
