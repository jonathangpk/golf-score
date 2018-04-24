import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ShellModule } from './shell/shell.module';
import { LoginComponent } from './auth/login/login.component';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
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
    ShellModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxsModule.forRoot([
      AuthState
    ]),
    environment.production ? [] : NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
