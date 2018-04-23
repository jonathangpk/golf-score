import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { NewRoundComponent } from './new-round/new-round.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from '../core/routing.module';
import { NewCourseComponent } from './new-course/new-course.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/user.state';
import { CourseState } from './store/course.state';

@NgModule({
  declarations: [
    ShellComponent,
    NewRoundComponent,
    HomeComponent,
    NewCourseComponent,
    ProfileComponent
  ],
  imports: [
    MatToolbarModule,
    MatCardModule,
    RoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AngularFirestoreModule,
    NgxsModule.forFeature([
      UsersState,
      CourseState
    ])
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule {}
