import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LaunchpadComponent } from './launchpad/launchpad.component';

const routes: Routes = [
  { path: '', component: LaunchpadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
