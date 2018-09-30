import { DayType } from '../models/day-type.model';
import { WeekDay } from '../models/week-day.model';
import { Month } from '../models/month.model';
import { Day } from '../models/day.model';
import { MonthDays } from '../models/month-days.model';


export class CalendarService {
    protected readonly monthRest: number[];

    private readonly monthDayCount: number[];

    constructor() {
        this.monthRest = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
        this.monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    public static isLeapYear(year: number): boolean {
        return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
    }

    public getDays(day: number, month: number, year: number, numberOfDays: number): Day[] {
        let weekDay = this.getWeekDay(day, month, year);
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

        if (weekDay !== WeekDay.Sunday) {
            for (let i = weekDay; i < 7; i++) {
                const monthDay: Day = {
                    dayType: DayType.Invalid,
                    weekDay: i
                };
                result.push(monthDay);
            }
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
                if (days[i].weekDay !== WeekDay.Sunday) {
                    for (let j = days[i].weekDay; j < 7; j++) {
                        const invalidDay: Day = { weekDay: j, dayType: DayType.Invalid };
                        firstMonth.days.push(invalidDay);
                    }
                }

                firstMonth = { month: 0, days: [], year: 0 };

                for (let j = 0; j < days[i].weekDay; j++) {
                    const invalidDay: Day = { weekDay: j, dayType: DayType.Invalid };
                    firstMonth.days.push(invalidDay);
                }
            }

            firstMonth.days.push(days[i]);
            if (days[i].dayType !== DayType.Invalid) {
                firstMonth.month = days[i].month;
                firstMonth.year = days[i].year;
            }

            i++;
        }

        result.push(firstMonth);
        const lastDay = firstMonth.days[firstMonth.days.length - 1];
        for (let j = lastDay.weekDay + 1; j < 7; j++) {
            const invalidDay: Day = { weekDay: j, dayType: DayType.Invalid };
            firstMonth.days.push(invalidDay);
        }

        return result;
    }

    public getMonthsWithHoliday(day: number, month: number, year: number, numberOfDays: number, countryCode: string): MonthDays[] {
        return this.getMonths(day, month, year, numberOfDays);
    }

    public getMonthDayCount(month: number, year: number): number {
        if (month === 2 && CalendarService.isLeapYear(year)) {
            return this.monthDayCount[month - 1] + 1;
        }

        return this.monthDayCount[month - 1];
    }

    public getWeekDay(day: number, month: number, year: number): WeekDay {
        const mod = (day + this.monthRest[month - 1] + (((year - 1) % 4) * 5)
            + (((year - 1) % 100) * 4) + (((year - 1) % 400) * 6)) % 7;

        return (CalendarService.isLeapYear(year) && month >= 3) ? mod + 1 : mod;
    }
}
