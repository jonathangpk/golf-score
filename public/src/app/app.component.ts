import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthChange, StartQuery } from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AuthChange({uid: user.uid, user: user}));
      } else {
        this.store.dispatch(new AuthChange({uid: null, user: null}));
      }
    });
  }
}
