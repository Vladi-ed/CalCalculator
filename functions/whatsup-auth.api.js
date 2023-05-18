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

  const headers = {
    "accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,ru;q=0.8,he;q=0.7",
    "cache-control": "no-cache",
    "content-type": "application/json",
    Host: "api.cal-online.co.il",
    Origin: "https://digital-web.cal-online.co.il",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-site-id": "09031987-273E-2311-906C-8AF85B17C8D9",
    "Referer": "https://digital-web.cal-online.co.il/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  }

  // request token by whatsUp
  // resp: {"token":"98954f42-e000-00e0-a876-0b45d0aa617e","phoneNumber":"058-*****00"}
  return fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/sendOTPWhatsappByCard", {
    headers,
    body,
    method: "POST"
  });
}
