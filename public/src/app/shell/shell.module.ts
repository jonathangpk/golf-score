import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import {
  MatAutocompleteModule,
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
import { UserState } from './store/user.state';
import { CourseState } from './store/course.state';
import { RoundState } from './store/round.state';
import { FirestoreService } from '../core/firestore.service';
import { CommonModule } from '@angular/common';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { FormsModule } from '@angular/forms';
import { InviteComponent } from './invite/invite.component';
import { RoundSettingsComponent } from './round-detail/round-settings/round-settings.component';
import { RoundScorecardComponent } from './round-detail/round-scorecard/round-scorecard.component';

@NgModule({
  declarations: [
    ShellComponent,
    NewRoundComponent,
    HomeComponent,
    NewCourseComponent,
    ProfileComponent,
    RoundDetailComponent,
    InviteComponent,
    RoundSettingsComponent,
    RoundScorecardComponent
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
    MatAutocompleteModule,
    AngularFirestoreModule.enablePersistence(),
    NgxsModule.forFeature([
      UserState,
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
