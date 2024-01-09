import {apiUrl, authMethod, headers} from "../data-objects/isracard-auth";

export function getIsracardSmsToken(tz: string, last6Digits: string) {
    const body = new FormData();
    body.set('id', tz);
    body.set('cardSuffix', last6Digits);
    body.set('idType', '1');
    body.set('countryCode', '212');
    body.set('kodChevra', '11');
    body.set('sendBySMS', 'true');

    return fetch(apiUrl + "SendOTP", {
        headers,
        body,
        method: authMethod,
        mode: 'no-cors',
        referrer: 'https://digital.isracard.co.il/personalarea/Login/',
    });
    //
    // console.log('Isracard SMS data', await resp)
    // return resp;
}