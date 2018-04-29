import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { ShellComponent } from '../shell/shell.component';
import { AuthGuard } from './auth.guard';
import { NewRoundComponent } from '../shell/new-round/new-round.component';
import { HomeComponent } from '../shell/home/home.component';
import { NewCourseComponent } from '../shell/new-course/new-course.component';
import { ProfileComponent } from '../shell/profile/profile.component';
import { RoundDetailComponent } from '../shell/round-detail/round-detail.component';
import { InviteComponent } from '../shell/invite/invite.component';
import { LogedinGuard } from './logedin.guard';

export const appRoutes = [
  { path: 'login', component: LoginComponent, canActivate: [LogedinGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LogedinGuard] },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'round/new', component: NewRoundComponent },
      { path: 'round/:id', component: RoundDetailComponent },
      { path: 'course/new', component: NewCourseComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'invite/:id', component: InviteComponent }
    ]
  },
  { path: '**', redirectTo: ''}

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  exports: [RouterModule]
})
export class RoutingModule {

}
