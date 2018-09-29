import { DayType } from '../models/day-type.model';
import { WeekDay } from '../models/week-day.model';
import { Month } from '../models/month.model';
import { Day } from '../models/day.model';
import { MonthDays } from '../models/month-days.model';


export class CalendarService {
    protected readonly monthRest: number[];

    private readonly monthDayCount: number[];

    constructor() {
        this.monthRest = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        this.monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }

    public getDays(day: number, month: number, year: number, numberOfDays: number): Day[] {
        let weekDay = this.getWeekDay(day, month, year);
        console.log(weekDay);
        const result: Day[] = [];

        for (let i = 0; i < weekDay; i++) {
            const monthDay: Day = {
                dayType: DayType.Invalid,
                weekDay: i
            };
            result.push(monthDay);
        }

        for (let i = 0; i < numberOfDays; i++) {
            const monthDayCount = this.getMonthDayCount(month, year);
            const monthDay: Day = {
                dayType: (weekDay === WeekDay.Saturday || weekDay === WeekDay.Sunday) ? DayType.Weekend : DayType.Regular,
                month: month,
                monthDay: day,
                weekDay: weekDay,
                year: year
            };
            result.push(monthDay);

            weekDay = (weekDay + 1) % 7;
            day++;
            if (day > monthDayCount) {
                day = 1;
                month++;
            }

            if (month > 12) {
                month = 1;
                year++;
            }
        }

        for (let i = weekDay; i < 7; i++) {
            const monthDay: Day = {
                dayType: DayType.Invalid,
                weekDay: i
            };
            result.push(monthDay);
        }

        return result;
    }

    public getMonths(day: number, month: number, year: number, numberOfDays: number): MonthDays[] {
        const days = this.getDays(day, month, year, numberOfDays);
        const result: MonthDays[] = [];
        let firstMonth: MonthDays = { month: 0, days: [], year: 0 };
        let i = 0;
        while (i < days.length && days[i].dayType === DayType.Invalid) {
            firstMonth.days.push(days[i]);

            i++;
        }

        if (i < days.length) {
            firstMonth.month = days[i].month;
            firstMonth.year = days[i].year;
        }

        while (i < days.length) {
            if (days[i].dayType !== DayType.Invalid && days[i].month !== firstMonth.month) {
                result.push(firstMonth);

                firstMonth = { month: 0, days: [], year: 0 };
            }

            firstMonth.days.push(days[i]);
            if (days[i].dayType !== DayType.Invalid) {
                firstMonth.month = days[i].month;
                firstMonth.year = days[i].year;
            }

            i++;
        }

        result.push(firstMonth);

        return result;
    }

    public getMonthDayCount(month: number, year: number): number {
        if (month === 2 && CalendarService.isLeapYear(year)) {
            return this.monthDayCount[month - 1] + 1;
        }

        return this.monthDayCount[month - 1];
    }

    public getWeekDay(day: number, month: number, year: number): WeekDay {
        const div1 = (year % 400) - ((year % 400) % 100);
        const div2 = (((year % 400) % 100) - 1) - ((((year % 400) % 100) - 1) % 4);

        let mod = (day + this.monthRest[month - 1] + ((div1 / 100) * 5)
            + (div2 / 4) + (((year % 400) % 100) - 1)) % 7;

        if ((year % 400 !== 0) && (year % 4 === 0)) {
            if (month >= 3) {
                mod = mod + 1;
            } else {
                mod = mod - 1;
            }
        }

        return mod + 1;
    }
}
