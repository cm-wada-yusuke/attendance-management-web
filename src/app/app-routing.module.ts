import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAttendanceComponent } from './components/user-attendance/user-attendance.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-attendance',
    pathMatch: 'full'
  },
  {
    path: 'user-attendance',
    component: UserAttendanceComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
