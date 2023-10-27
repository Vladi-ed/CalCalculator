import {method, headers} from "../src/app/data-objects/cal-auth";

export const onRequestPost = async ({ request }) => {

  const body = JSON.stringify(await request.json());
  headers["Content-Length"] = String(body.length);

  // AUTHENTICATION
  let apiResp = await fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/otp", {
    headers,
    body,
    method
  });

  const authToken = await apiResp.json().then(rep => rep.token);

  if (!authToken) return new Response('No token received');

  const authorization = "CALAuthScheme " + authToken;
  // console.log('authorization', authorization);
  headers.authorization = authorization;

  // getting bank/card details
  apiResp = await fetch("https://api.cal-online.co.il/Authentication/api/account/init", {
    headers,
    body: "{\"tokenGuid\":\"\"}",
    method
  });

  const bankAccountAndCards = await apiResp.json();
  console.log('bankAccountAndCards', JSON.stringify(bankAccountAndCards, null, 2));


  apiResp = JSON.stringify({
    bankAccountUniqueID: bankAccountAndCards.result.bankAccounts[0].bankAccountUniqueId,
    cards: bankAccountAndCards.result.cards.map(card => ({
      cardUniqueID: card.cardUniqueId,
      currentDebitDay: card.currentDebitDay,
      brandLogo: card.cardImagesUrl.brandLogo
    })),
    authorization
  });

  return new Response(apiResp);

}
