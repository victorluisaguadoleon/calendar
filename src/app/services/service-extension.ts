export const URL_SEPARATOR = '/';
export const URL_PARAM_SEPARATOR = '?';
export const PARAM_SEPARATOR = '&';


export class ServiceExtension {
    public static mergeUrl(serviceUrl: string, relativeUrl: string, queryParams?: URLSearchParams|string): string {
        if (relativeUrl.startsWith(URL_SEPARATOR)) {
            relativeUrl = relativeUrl.substr(1, relativeUrl.length - 1);
        }

        if (relativeUrl.endsWith(URL_SEPARATOR)) {
            relativeUrl = relativeUrl.substr(0, relativeUrl.length - 1);
        }

        let url = serviceUrl + URL_SEPARATOR + relativeUrl;
        if (queryParams) {
            if (queryParams instanceof URLSearchParams) {
                queryParams = queryParams.toString();
            }

            url += URL_PARAM_SEPARATOR + queryParams;
        }

        return url;
    }
}
