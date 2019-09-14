import { Injectable } from '@angular/core';
import { UserAttendanceClientService } from '../../infrastructures/attendance/user-attendance-client.service';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GetUserAttendanceUseCaseService {

  constructor(private userAttendanceClient: UserAttendanceClientService) {
  }

  getUserAttendances(name: string, month: Moment): Promise<Attendance[]> {
    return this.userAttendanceClient.getAttendaces(name, month);
  }
}


export interface Attendance {
  attendanceId: string;
  userId: string;
  name: string;
  displayName: string;
  startAt: Moment;
  endAt: Moment;
  startAtDay: Moment;
  startAtMonth: Moment;
}
