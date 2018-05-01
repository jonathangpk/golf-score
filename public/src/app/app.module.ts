import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { LoginComponent } from './auth/login/login.component';
import {
  MAT_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER,
  MatButtonModule,
  MatCardModule, MatIconModule,
  MatInputModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './auth/register/register.component';
import { RoutingModule } from './core/routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthState } from './auth/store/auth.state';
import { NgxsModule } from '@ngxs/store';
import { AuthGuard } from './core/auth.guard';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CourseState } from './shell/store/course.state';
import { RoundState } from './shell/store/round.state';
import { LogedinGuard } from './core/logedin.guard';
import { GolfBallProgressComponent } from './golf-ball-progress/golf-ball-progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GolfBallProgressComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShellModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxsModule.forRoot([
      AuthState
    ]),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    LogedinGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
