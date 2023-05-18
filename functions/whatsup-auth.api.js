export const onRequestGet = async ({ request }) => {

  const requestParams = new URL(request.url).searchParams;
  const last4Digits = requestParams.get('last4Digits');

  if (!last4Digits || !requestParams.get('tz')) return new Response('Missing data' + requestParams.toString(), { status: 400, statusText: 'Missing data'});



  const body = JSON.stringify({
    userId: requestParams.get('tz'),
    last4Digits,
    bankAccountNum: last4Digits,
    sMSTemplate: null,
    recaptcha: ""
  })

  console.log(body);

  // request token by whatsUp
  // resp: {"token":"98954f42-e807-49e4-a876-0b45d0aa617e","phoneNumber":"058-*****88"}
  return fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/sendOTPWhatsappByCard", {
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8,he;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-site-id": "5B5160DD-F84A-4D72-B67E-65891BA194FF",
      "Referer": "https://www.cal-online.co.il/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body,
    method: "POST"
  });
}
