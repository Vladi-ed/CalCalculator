export const onRequestPost = async ({ request }) => {
  // return fetch("https://api.cal-online.co.il/Transactions.Reports/api/MonthlyTransactions/CreateMonthlyTransactionsReport", {
  // return fetch("https://api.cal-online.co.il/Transactions/api/transactionsDetails/getCardTransactionsDetails", {
  // return fetch("https://api.cal-online.co.il/Transactions/api/filteredTransactions/getFilteredTransactions", {

  // "body": "{\"custID\":\"300000009\",\"password\":\"514122\",\"token\":\"dba1a334-0000-0000-9bc8-9ceb01b8c946\"}",
  const body = JSON.stringify(await request.json());
  const method = 'POST';
  const headers = {
    "accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9,ru;q=0.8,he;q=0.7",
    "authorization": null,
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

  // get auth token (password - comes with sms, token from previous api resp)
  // resp:
  // {
  //     "token": "ts1HaeTIOlZgmke5m2Z+t/AZs8TyRzom5UTGzw2P3pBYza8SR50kGBP6tv9Mmyrm1rCKctJlFO+RAXqmpRWOugaTKmpigZKKvVMzTaFRXfO1cDULOOcueISmlfsSPEqqLQVFBqyc3vphjCXELWUwPXVpnO83lhz7HgR+7tEPgIY7DLE8kw+l9cT2Qd0AHYnsO3CSz6RGSyorXcJBYpXZhT2eZcgwuLjsELdg9aJBarpcughRLGrl9hdZ13S9GI4C05foFijE2svKo6/cux89pfSzqIlxSs303ex6AoXlyUgz97hS/AGzvMMNL/wVbkWKtJ7m8jurA6e2II/5cw446DrPqXl3rYh2ZYjWG/FHhGCsqUQDzGwKdRXBDFV8q6sGYZKzT9lo6XVXiqr7p8oyoY/f43ZbvgaYIF7NsG0eEDk=",
  //     "innerLoginType": 0,
  //     "hash": null
  // }
  const authTokenResp = await fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/otp", {
    headers,
    body,
    method
  });

  const authToken = await authTokenResp.json().then(rep => rep.token);

  if (!authToken) return new Response('No token received');

  const authorization = "CALAuthScheme " + authToken;
  console.log(authorization);
  headers.authorization = authorization;

  // getting bank details
  const bankAccountAndCardsResp = fetch("https://api.cal-online.co.il/Authentication/api/account/init", {
    headers,
    body: "{\"tokenGuid\":\"\"}",
    method
  });

  const bankAccountAndCards = await bankAccountAndCardsResp.json().then(resp => ({
    bankAccountUniqueID: resp.result.bankAccounts[0].bankAccountUniqueID,
    cards: resp.result.cards.map(card => ({cardUniqueID: card.cardUniqueId}))
  }));

  console.log(bankAccountAndCards);

  const filteredTransactionsBody = JSON.stringify({
    ...bankAccountAndCards,
    "fromTransDate": "2022-11-17T22:00:00.000Z",
    "toTransDate": "2023-05-17T20:59:59.999Z",
    "merchantHebName": "",
    "merchantHebCity": "",
    "trnType": 0,
    "fromTrnAmt": 0,
    "toTrnAmt": 0,
    "transactionsOrigin": 0,
    "transCardPresentInd": 0
  })

  return fetch("https://api.cal-online.co.il/Transactions/api/filteredTransactions/getFilteredTransactions", {
    headers,
    body: filteredTransactionsBody,
    method
  });
}
