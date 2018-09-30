import { Component, OnInit, Inject } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Day } from '../../models/day.model';
import {IMyDpOptions} from 'mydatepicker';
import { MonthDays } from '../../models/month-days.model';
import { DayType } from '../../models/day-type.model';
import { Month } from '../../models/month.model';
import { HolidayService } from '../../services/holiday.service';
import { SimpleDay } from '../../models/simple-day.model';


@Component({
    selector: 'app-home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    public date;

    public numberOfDay: number;

    public countryCode: string;

    public myDatePickerOptions: IMyDpOptions;

    public calendar: MonthDays[];

    constructor(@Inject(CalendarService) public calendarService: CalendarService,
        @Inject(HolidayService) public holidayService: HolidayService) {
     }

    ngOnInit() {
        const date = new Date(Date.now());
        this.date = {};
        this.numberOfDay = 0;
        this.countryCode = '';
        this.myDatePickerOptions = {
            dateFormat: 'dd/mm/yyyy',
            firstDayOfWeek : 'su'
        };

        this.refreshCalendar();
    }

    public refreshCalendar() {
        const newCalendar = this.getCalendarMonthDays();
        if (this.countryCode && this.countryCode !== '') {
            const years = this.getYears(newCalendar);
            if (years.length <= 0) {
                this.calendar = newCalendar;
            }

            this.setHolidays(newCalendar, years, this.countryCode, 0);
        }
    }

    public getWeeks(monthDays: MonthDays): any[] {
        const result = [];
        let week: Day[] = [];
        for (let i = 0; i < monthDays.days.length; i++) {
            if (i !== 0 && i % 7 === 0) {
                result.push(week);

                week = [];
            }

            week.push(monthDays.days[i]);
        }

        result.push(week);

        return result;
    }

    private getCalendarMonthDays(): MonthDays[] {
        if (this.date === null || this.numberOfDay === undefined || this.numberOfDay === null || this.numberOfDay === 0) {
            return [];
        }

        const day = this.date.date.day;
        const month = this.date.date.month;
        const year = this.date.date.year;

        const result = this.calendarService.getMonths(day, month, year, this.numberOfDay);

        return result;
    }

    private monthToStr(value: number): any {
        return Month[value].split(/(?=[A-Z])/).join().replace(',', ' ');
    }

    private dayTypeToClass(value: number): any {
        return DayType[value].split(/(?=[A-Z])/).join().replace(',', ' ').toLowerCase();
    }

    private getYears(months: MonthDays[]): number[] {
        const result: number[] = [];
        let currentYear = 0;
        for (let i = 0; i < months.length; i++) {
            const month = months[i];
            if (currentYear !== month.year) {
                result.push(month.year);

                currentYear = month.year;
            }
        }

        return result;
    }

    private setHolidays(months: MonthDays[], years: number[], countryCode: string, index: number) {
        if (index >= years.length) {
            this.calendar = months;
            return;
        }

        const year = years[index];
        this.holidayService.getHolidays(year, countryCode).subscribe((response: SimpleDay[]) => {
            for (let i = 0; i < months.length; i++) {
                const month = months[i];
                if (month.year > year) {
                    break;
                }

                for (let j = 0; j < month.days.length; j++) {
                    const day = month.days[j];
                    if (day.dayType === DayType.Invalid) {
                        continue;
                    }

                    for (let k = 0; k < response.length; k++) {
                        const holiday = response[k];
                        if (day.monthDay === holiday.monthDay
                            && day.month === holiday.month
                            && day.year === holiday.year) {
                            day.dayType = DayType.Holiday;
                        }
                    }
                }
            }

            this.setHolidays(months, years, countryCode, index + 1);
        }, error => {
            this.calendar = months;
        });
    }
}
