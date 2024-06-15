import {method, headers} from "../src/app/data-objects/cal-auth";

export const onRequestGet: PagesFunction = async ({ request }) => {

  const requestParams = new URL(request.url).searchParams;
  const last4Digits = requestParams.get('last4Digits');
  const userId = requestParams.get('tz');

  if (!last4Digits || !userId) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

  const body = JSON.stringify({
    userId,
    last4Digits,
    bankAccountNum: last4Digits,
    sMSTemplate: null,
    recaptcha: ""
  })

  console.log(body);

  headers["Content-Length"] = String(body.length);

  // request token by whatsUp
  // resp: {"token":"98954f42-e000-00e0-a876-0b45d0aa617e","phoneNumber":"058-*****00"}
  return fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/sendOTPWhatsappByCard", {
    headers,
    body,
    method
  });
}
