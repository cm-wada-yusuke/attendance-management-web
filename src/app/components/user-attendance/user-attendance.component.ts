import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from '../../modules/utils/date-time.service';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-user-attendance',
  templateUrl: './user-attendance.component.html',
  styleUrls: ['./user-attendance.component.scss'],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'YYYY-MM',
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY',
        },
      },
    },
  ]
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
      month: new FormControl(DateTime.jst().startOf('month'), [Validators.required])
    });
  }

  refresh() {
  }

  search() {
    this.refresh();
    this.loading = true;
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.attendanceSearchFormGroup.controls.month.value;
    ctrlValue.month(normalizedMonth.month());
    this.attendanceSearchFormGroup.controls.month.setValue(ctrlValue);
    datepicker.close();
  }


}
