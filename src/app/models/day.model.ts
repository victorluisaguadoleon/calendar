import { DayType } from './day-type.model';
import { WeekDay } from './week-day.model';
import { Month } from './month.model';
import { SimpleDay } from './simple-day.model';


export interface Day extends SimpleDay {
    dayType: DayType;

    weekDay: WeekDay;
}
