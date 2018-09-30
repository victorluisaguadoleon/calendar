import { Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { HolidayCollection } from '../models/holiday-collection.model';
import { ServiceExtension } from './service-extension';
import { Observable } from 'rxjs';
import { SimpleDay } from '../models/simple-day.model';



export const HOLIDAY_SERVER_URL = 'HOLIDAY_SERVER_URL';
export const HOLIDAY_ACCESS_KEY = 'HOLIDAY_ACCESS_KEY';
export const HOLIDAY_SECRET_KEY = 'HOLIDAY_SECRET_KEY';
export const HOLIDAY_END_POINT = 'HOLIDAY_END_POINT';

export const COUNTRY_PARAM = 'country';
export const YEAR_PARAM = 'year';
export const VERSION_PARAM = 'version';
export const VERSION_PARAM_VALUE = '2';
export const OUT_PARAM = 'out';
export const OUT_PARAM_VALUE = 'json';
export const ACCESS_KEY_PARAM = 'accesskey';
export const EXPIRES_PARAM = 'expires';
export const EXPIRES_TIME = 10;
export const SIGNATURE_PARAM = 'signature';
export const TIMESPAN_PARAM = 'timestamp';
export const TYPES_PARAM = 'types';
export const TYPES_PARAM_VALUE = 'all';

export class HolidayService {
    private signature: string;

    private expireDate: Date;

    constructor(@Inject(HttpClient) private httpClient: HttpClient,
        @Inject(HOLIDAY_SERVER_URL) private holidayServerUrl: string,
        @Inject(HOLIDAY_ACCESS_KEY) private holidayAccessKey: string,
        @Inject(HOLIDAY_SECRET_KEY) private holidaySecretKey: string,
        @Inject(HOLIDAY_END_POINT) private holidayEndPoint: string) {
        this.signature = null;
        this.expireDate = new Date();
    }

    public getHolidays(year: number, countryCode: string): Observable<SimpleDay[]> {
        const currentDate = new Date(Date.now());

        if (!this.signature || currentDate > this.expireDate) {
            const expireDate = new Date(Date.now());
            expireDate.setTime(expireDate.getTime() + (10 * 60 * 1000));

            const message = this.holidayAccessKey + this.holidayEndPoint + expireDate.toISOString();
            const signature = CryptoJS.HmacSHA1(message, this.holidaySecretKey);

            this.signature = signature;
            this.expireDate = expireDate;
        }

        let urlParam: HttpParams = new HttpParams();
        const endPointUrl = ServiceExtension.mergeUrl(this.holidayServerUrl, this.holidayEndPoint);

        urlParam = urlParam.append(COUNTRY_PARAM, countryCode);
        urlParam = urlParam.append(YEAR_PARAM, year.toString());
        urlParam = urlParam.append(VERSION_PARAM, VERSION_PARAM_VALUE);
        urlParam = urlParam.append(OUT_PARAM, OUT_PARAM_VALUE);
        urlParam = urlParam.append(ACCESS_KEY_PARAM, this.holidayAccessKey);
        urlParam = urlParam.append(EXPIRES_PARAM, this.expireDate.toISOString());
        urlParam = urlParam.append(SIGNATURE_PARAM, CryptoJS.enc.Base64.stringify(this.signature));
        urlParam = urlParam.append(TYPES_PARAM, TYPES_PARAM_VALUE);
        return this.httpClient.get<HolidayCollection>(endPointUrl, { params: urlParam })
            .pipe(map((response: HolidayCollection) => {
                console.log(response);
                const result: SimpleDay[] = [];
                if (response.errors && response.errors.length > 0) {
                    return result;
                }

                if (response.holidays && response.holidays.length > 0) {
                    for (let i = 0; i < response.holidays.length; i++) {
                        const holidayResp = response.holidays[i].date;
                        const simpleDay: SimpleDay = {
                            monthDay: holidayResp.datetime.day,
                            month: holidayResp.datetime.month,
                            year: holidayResp.datetime.year
                        };

                        result.push(simpleDay);
                    }
                }

                return result;
            }));
    }
}
