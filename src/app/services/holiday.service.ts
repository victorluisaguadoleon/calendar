import { Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { HolidayCollection } from '../models/holiday-collection.model';
import { ServiceExtension } from './service-extension';
import { Observable } from 'rxjs';



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

export class HolidayService {

    constructor(@Inject(HttpClient) private httpClient: HttpClient,
        @Inject(HOLIDAY_SERVER_URL) private holidayServerUrl: string,
        @Inject(HOLIDAY_ACCESS_KEY) private holidayAccessKey: string,
        @Inject(HOLIDAY_SECRET_KEY) private holidaySecretKey: string,
        @Inject(HOLIDAY_END_POINT) private holidayEndPoint: string) {

    }

    public getHolidays(year: number, countryCode: string): Observable<HolidayCollection> {
        const currentDate = new Date(Date.now());
        console.log(currentDate.toISOString());
        const message = this.holidayAccessKey + this.holidayEndPoint + currentDate.toISOString();
        const signature = CryptoJS.HmacSHA1(message, this.holidaySecretKey);
        console.log(signature);

        const urlParam: HttpParams = new HttpParams();
        const endPointUrl = ServiceExtension.mergeUrl(this.holidayServerUrl, this.holidayEndPoint);

        urlParam.append(COUNTRY_PARAM, countryCode);
        urlParam.append(YEAR_PARAM, year.toString());
        urlParam.append(VERSION_PARAM, VERSION_PARAM_VALUE);
        urlParam.append(OUT_PARAM, OUT_PARAM_VALUE);
        urlParam.append(ACCESS_KEY_PARAM, this.holidayAccessKey);
        urlParam.append(TIMESPAN_PARAM, currentDate.toISOString());
        urlParam.append(SIGNATURE_PARAM, signature);
        return this.httpClient.get<HolidayCollection>(endPointUrl, { params: urlParam });
    }
}
