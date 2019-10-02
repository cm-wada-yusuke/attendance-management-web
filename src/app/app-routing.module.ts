import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAttendanceComponent } from './components/user-attendance/user-attendance.component';
import { CallbackComponent } from './components/auth/callback/callback.component';
import { AuthGuard } from './domains/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-attendance',
    pathMatch: 'full'
  },
  {
    path: 'user-attendance',
    component: UserAttendanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
