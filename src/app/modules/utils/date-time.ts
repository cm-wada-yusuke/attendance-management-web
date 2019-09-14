import * as moment from 'moment';
import 'moment-timezone';
import { Moment } from 'moment';


moment.locale('ja',
  {
    weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    weekdaysShort: ['日', '月', '火', '水', '木', '金', '土']
  }
);

export class DateTime {

  public static jst(): Moment {
    return moment().locale('ja');
  }

  public static utc(year: number, month: number, day: number): Moment {
    return moment.tz({year, month, day}, 'UTC');
  }

  public static formatJstTime(m: Moment): string {
    return m.format('HH:mm:ss');
  }

  public static formatDay(m: Moment): string {
    return m.locale('ja').format('MM/DD （ddd）');
  }

  public static formatMonth(m: Moment): string {
    return m.format('YYYY年MM月');
  }

  public static formatDayClass(m: Moment): DayClass {
    if (m.isoWeekday() === 6) {
      return 'saturday';
    } else if (m.isoWeekday() === 7) {
      return 'holiday';
    } else {
      return 'weekday';
    }

  }

}

export type DayClass = 'saturday' | 'holiday' | 'weekday';
