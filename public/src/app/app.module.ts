import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { LoginComponent } from './auth/login/login.component';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressBarModule, MatSnackBarModule } from '@angular/material';
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
import { LogedinGuard } from './core/logedin.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseState } from './shell/store/course.state';
import { RoundState } from './shell/store/round.state';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    MatProgressBarModule,
    MatIconModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxsModule.forRoot([
      AuthState,
      CourseState,
      RoundState
    ]),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
    LogedinGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
