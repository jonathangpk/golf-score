import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { MatToolbarModule } from '@angular/material';

@NgModule({
  declarations: [
    ShellComponent
  ],
  imports: [
    MatToolbarModule
  ],
  exports: [
    ShellComponent
  ]
})
export class ShellModule {}
