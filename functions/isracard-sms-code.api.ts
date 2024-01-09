import {apiUrl, authMethod, headers} from "../src/app/data-objects/isracard-auth";

// not required (may run locally)
export const onRequestGet: PagesFunction = async ({ request }) => {

  const requestParams = new URL(request.url).searchParams;
  const last6Digits = requestParams.get('last6Digits');
  const taudatZehut = requestParams.get('tz');

  if (!last6Digits || !taudatZehut) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

  const body = new FormData();
  body.set('id', taudatZehut);
  body.set('cardSuffix', last6Digits);
  body.set('idType', '1');
  body.set('countryCode', '212');
  body.set('kodChevra', '11');
  body.set('sendBySMS', 'true');

  // request token by sms
  return fetch(apiUrl + "SendOTP", {
    headers,
    body,
    method: authMethod
  });
}
