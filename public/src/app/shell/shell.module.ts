import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatProgressBarModule,
  MatSelectModule,
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
import { FirestoreService } from '../core/firestore.service';
import { CommonModule } from '@angular/common';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { FormsModule } from '@angular/forms';
import { InviteComponent } from './invite/invite.component';
import { RoundSettingsComponent } from './round-detail/round-settings/round-settings.component';
import { RoundScorecardComponent } from './round-detail/round-scorecard/round-scorecard.component';
import { RoundResultComponent } from './round-detail/round-result/round-result.component';
import { NgxsModule } from '@ngxs/store';
import { ProgressBarService } from './progress-bar.service';
import { CopyService } from '../core/copy.service';
import { CourseEditComponent } from './profile/course-edit/course-edit.component';
import { ProfileCoursesComponent } from './profile/profile-courses/profile-courses.component';

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
    RoundScorecardComponent,
    RoundResultComponent,
    ProfileCoursesComponent,
    CourseEditComponent,
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
    MatSelectModule,
    MatProgressBarModule,
    MatListModule,
    NgxsModule.forFeature([
    ]),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    FirestoreService,
    ProgressBarService,
    CopyService
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule {}
