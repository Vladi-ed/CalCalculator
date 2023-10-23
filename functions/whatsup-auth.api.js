import {method, headers} from "../src/app/data-objects/cal-auth";

export const onRequestGet = async ({ request }) => {

  const requestParams = new URL(request.url).searchParams;
  const last4Digits = requestParams.get('last4Digits');

  if (!last4Digits || !requestParams.get('tz')) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

  const body = JSON.stringify({
    userId: requestParams.get('tz'),
    last4Digits,
    bankAccountNum: last4Digits
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
