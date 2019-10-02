import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateTime } from '../../modules/utils/date-time';
import { Moment } from 'moment';
import { MAT_DATE_FORMATS, MatDatepicker } from '@angular/material';
import { Attendance, GetUserAttendanceUseCaseService } from '../../domains/attendance/get-user-attendance-use-case.service';
import { Auth0ClientService } from '../../domains/auth/auth0-client.service';

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
  userAttendances: CalendarAttendance[];
  displayedColumns = ['day', 'startAt', 'endAt', 'workingTime'];
  summary: Summary;

  constructor(private breakpointObserver: BreakpointObserver,
              private useCase: GetUserAttendanceUseCaseService,
              public auth: Auth0ClientService
  ) {
  }

  ngOnInit(): void {
    this.attendanceSearchFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      month: new FormControl(DateTime.jst().startOf('month'), [Validators.required])
    });
    this.refresh();
  }

  refresh() {
    this.userAttendances = this.generateCalendarAttendance([]);
    this.summary = this.generateSummary([]);
  }

  search() {
    this.refresh();
    this.loading = true;
    this.useCase.getUserAttendances(
      this.attendanceSearchFormGroup.controls.name.value,
      this.attendanceSearchFormGroup.controls.month.value,
    ).then(attendances => {
      console.log('attendances', attendances);
      this.userAttendances = this.generateCalendarAttendance(attendances);
      console.log('userAttendances', this.userAttendances);
      this.summary = this.generateSummary(attendances);
      console.log('summary', this.summary);
      this.loading = false;
    })
      .catch(e => {
        console.log(e);
        this.loading = false;
        this.refresh();
      });
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.attendanceSearchFormGroup.controls.month.value;
    ctrlValue.month(normalizedMonth.month());
    this.attendanceSearchFormGroup.controls.month.setValue(ctrlValue);
    datepicker.close();
  }

  generateCalendarAttendance(user: Attendance[]): CalendarAttendance[] {
    const month: Moment = this.attendanceSearchFormGroup.controls.month.value;
    const days = month.daysInMonth();
    console.log(month, days);

    return Array.from(new Array(days)).map((_, i) => {
      const day = DateTime.utc(month.year(), month.month(), i + 1);
      const attendance = user.filter(a => {
        return a.startAtDay.diff(day) === 0;
      });

      return {
        day,
        attendance: attendance.length ? attendance[0] : undefined
      };
    });
  }

  generateSummary(users: Attendance[]): Summary {
    const month = this.attendanceSearchFormGroup.controls.month.value;
    const total = users.reduce((acc, v) => acc + this.workTime(v), 0);

    return {
      displayName: users.length ? users[0].displayName || users[0].name : '-',
      month: DateTime.formatMonth(month),
      totalWorkTime: total.toPrecision(5),
      avatarImage: users.length ? users[0].image48 : 'https://material.angular.io/assets/img/examples/shiba1.jpg'
    };
  }

  formatStartAt(calendar: CalendarAttendance): string {
    if (!calendar.attendance || !calendar.attendance.startAt) {
      return '-';
    }
    return DateTime.formatJstTime(calendar.attendance.startAt);

  }

  formatDayClass(calendar: CalendarAttendance): string {
    return DateTime.formatDayClass(calendar.day);
  }

  formatDay(calendar: CalendarAttendance): string {
    if (!calendar.day) {
      return '-';
    }
    return DateTime.formatDay(calendar.day);
  }

  formatEndAt(calendar: CalendarAttendance): string {
    if (!calendar.attendance || !calendar.attendance.endAt) {
      return '-';
    }
    console.log('calendar.attendance.endAt', calendar.attendance.endAt);
    return DateTime.formatJstTime(calendar.attendance.endAt);
  }

  formatWorkingTime(calendar: CalendarAttendance): string {
    if (!calendar.attendance || !calendar.attendance.startAt || !calendar.attendance.endAt) {
      return '-';
    }
    return this.workTime(calendar.attendance).toPrecision(3);
  }

  workTime(a: Attendance): number {
    if (!a.endAt) {
      return 0;
    }
    return a.endAt.diff(a.startAt, 'hours', true);
  }

}


interface CalendarAttendance {
  day: Moment;
  attendance?: Attendance;
}

interface Summary {
  displayName: string;
  month: string;
  totalWorkTime: string;
  avatarImage: string;
}
