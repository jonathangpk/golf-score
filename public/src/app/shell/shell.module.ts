import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { NewRoundComponent } from './new-round/new-round.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from '../core/routing.module';
import { NewCourseComponent } from './new-course/new-course.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NgxsModule } from '@ngxs/store';
import { UsersState } from './store/user.state';
import { CourseState } from './store/course.state';
import { RoundState } from './store/round.state';
import { FirestoreService } from '../core/firestore.service';
import { CommonModule } from '@angular/common';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShellComponent,
    NewRoundComponent,
    HomeComponent,
    NewCourseComponent,
    ProfileComponent,
    RoundDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    RoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,
    AngularFirestoreModule.enablePersistence(),
    NgxsModule.forFeature([
      UsersState,
      CourseState,
      RoundState
    ])
  ],
  providers: [
    FirestoreService
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule {}
