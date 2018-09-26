import { DayType } from './day-type.model';
import { WeekDay } from './week-day.model';


export interface Day {
    dayType: DayType;

    monthDay: number;

    weekDay: WeekDay;
}
