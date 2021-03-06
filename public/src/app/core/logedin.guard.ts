import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LogedinGuard implements CanActivate, CanActivateChild {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState.pipe(map(user => {
      if (user) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    }));
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}

