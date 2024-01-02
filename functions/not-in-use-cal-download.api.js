import {method, headers} from "../src/app/data-objects/cal-auth";

export const onRequestPost = async ({ request }) => {
  // return fetch("https://api.cal-online.co.il/Transactions.Reports/api/MonthlyTransactions/CreateMonthlyTransactionsReport", {
  // return fetch("https://api.cal-online.co.il/Transactions/api/transactionsDetails/getCardTransactionsDetails", {
  // return fetch("https://api.cal-online.co.il/Transactions/api/filteredTransactions/getFilteredTransactions", {

  // "body": "{\"custID\":\"300000009\",\"password\":\"514122\",\"token\":\"dba1a334-0000-0000-9bc8-9ceb01b8c946\"}",
  const body = JSON.stringify(await request.json());

  headers["Content-Length"] = String(body.length);

  // get auth token (password - comes with sms, token from previous api resp)
  // resp:
  // {
  //     "token": "ts1HaeTIOlZgmke5m2Z+t/AZs8TyRzom5UTGzw2P3pBYza8SR50kGBP6tv9Mmyrm1rCKctJlFO+RAXqmpRWOugaTKmpigZKKvVMzTaFRXfO1cDULOOcueISmlfsSPEqqLQVFBqyc3vphjCXELWUwPXVpnO83lhz7HgR+7tEPgIY7DLE8kw+l9cT2Qd0AHYnsO3CSz6RGSyorXcJBYpXZhT2eZcgwuLjsELdg9aJBarpcughRLGrl9hdZ13S9GI4C05foFijE2svKo6/cux89pfSzqIlxSs303ex6AoXlyUgz97hS/AGzvMMNL/wVbkWKtJ7m8jurA6e2II/5cw446DrPqXl3rYh2ZYjWG/FHhGCsqUQDzGwKdRXBDFV8q6sGYZKzT9lo6XVXiqr7p8oyoY/f43ZbvgaYIF7NsG0eEDk=",
  //     "innerLoginType": 0,
  //     "hash": null
  // }


  // AUTHENTICATION

  let apiResp = await fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/otp", {
    headers,
    body,
    method
  });

  const authToken = await apiResp.json().then(rep => rep.token);

  if (!authToken) return new Response('No token received');

  const authorization = "CALAuthScheme " + authToken;
  console.log(authorization);
  headers.authorization = authorization;

  // getting bank/card details
  apiResp = await fetch("https://api.cal-online.co.il/Authentication/api/account/init", {
    headers,
    body: "{\"tokenGuid\":\"\"}",
    method
  });

  const bankAccountAndCards = await apiResp.json().then(resp => ({
    bankAccountUniqueID: resp.result.bankAccounts[0].bankAccountUniqueId,
    cards: resp.result.cards.map(card => ({cardUniqueID: card.cardUniqueId})), // for all credit cards
    fromTransDate: "2023-02-17T22:00:00.000Z", // TODO: make it as a param
    toTransDate: new Date().toISOString()
  }));

  apiResp = null;

  console.log(JSON.stringify(bankAccountAndCards, null, 2));

  const searchParams = new URL(request.url).searchParams;
  if (searchParams.has('month')) {

    const cardTransactionsDetailsBody = JSON.stringify({
      cardUniqueId: bankAccountAndCards.cards[0].cardUniqueID, // for specific credit card
      month: searchParams.get('month'),
      year: searchParams.get('year')
    })

    return fetch("https://api.cal-online.co.il/Transactions/api/transactionsDetails/getCardTransactionsDetails", {
      headers,
      body: cardTransactionsDetailsBody,
      method
    });
  }
  else {
    const filteredTransactionsBody = JSON.stringify({
      ...bankAccountAndCards,
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


}
