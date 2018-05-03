import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule, MatProgressBarModule, MatSelectModule,
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
import { CourseState } from './store/course.state';
import { RoundState } from './store/round.state';
import { ProgressBarService } from './progress-bar.service';

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
    RoundResultComponent
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
    NgxsModule.forFeature([
    ]),
    AngularFirestoreModule.enablePersistence(),
  ],
  providers: [
    FirestoreService,
    ProgressBarService
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule {}
