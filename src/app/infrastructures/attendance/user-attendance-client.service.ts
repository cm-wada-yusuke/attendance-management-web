import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Attendance } from '../../domains/attendance/get-user-attendance-use-case.service';
import { DateTime } from '../../modules/utils/date-time';

@Injectable({
  providedIn: 'root'
})
export class UserAttendanceClientService {

  private resourcePath =
    environment.attendanceApi.baseUrl + '/admin/attendances';

  private headers = {'Content-Type': 'application/json'};

  constructor(
    private http: HttpClient
  ) {
  }

  getAttendaces(name: string, month: Moment): Promise<Attendance[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('month', month.format('YYYY-MM'));
    return this.http.get(this.resourcePath, {
      params,
      headers: new HttpHeaders(this.headers)
    }).toPromise().then(this.convertUserAttendanceResponse);
  }


  convertUserAttendanceResponse(response): Attendance[] {
    console.log(response);
    const itemArray = response as Array<UserAttendanceResponse>;
    return itemArray.map(res => ({
      attendanceId: res.attendanceId,
      userId: res.userId,
      name: res.name,
      displayName: res.displayName,
      startAt: moment(res.startAt),
      endAt: moment(res.endAt),
      startAtDay: moment(res.startAtDay),
      startAtMonth: moment(res.startAtMonth)
    }));
  }


}

interface UserAttendanceResponse {
  attendanceId: string;
  userId: string;
  name: string;
  displayName: string;
  startAt: string;
  endAt: string;
  startAtDay: string;
  startAtMonth: string;
}
