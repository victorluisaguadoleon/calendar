export const URL_SEPARATOR = '/';
export const URL_PARAM_SEPARATOR = '?';
export const PARAM_SEPARATOR = '&';


export class ServiceExtension {
    public static mergeUrl(serviceUrl: string, relativeUrl: string): string {
        if (serviceUrl.endsWith(URL_SEPARATOR)) {
            serviceUrl = serviceUrl.substr(0, serviceUrl.length - 1);
        }

        if (relativeUrl.startsWith(URL_SEPARATOR)) {
            relativeUrl = relativeUrl.substr(1, relativeUrl.length - 1);
        }

        if (relativeUrl.endsWith(URL_SEPARATOR)) {
            relativeUrl = relativeUrl.substr(0, relativeUrl.length - 1);
        }

        const url = serviceUrl + URL_SEPARATOR + relativeUrl;

        return url;
    }
}
