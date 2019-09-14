import * as moment from 'moment';
import { Moment } from 'moment';

export class DateTime {

  public static jst(): Moment {
    return moment().locale('ja');
  }

}
