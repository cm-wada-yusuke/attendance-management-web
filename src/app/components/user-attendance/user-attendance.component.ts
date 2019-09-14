import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-attendance',
  templateUrl: './user-attendance.component.html',
  styleUrls: ['./user-attendance.component.scss']
})
export class UserAttendanceComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  attendanceSearchFormGroup: FormGroup;
  loading: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.attendanceSearchFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required])
    });
  }

  refresh() {
  }

  search() {
    this.refresh();
    this.loading = true;
  }


}
