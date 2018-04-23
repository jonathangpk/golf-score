import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: `
    <mat-toolbar color="primary" style="display: flex; justify-content: space-between">
      <div routerLink="/">Golf Score</div>
      <button mat-icon-button routerLink="/profile"><mat-icon>account_circle</mat-icon></button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `
})
export class ShellComponent {}
