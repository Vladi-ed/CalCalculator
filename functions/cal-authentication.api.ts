import { calApiUrl, headers, method } from "../src/app/data-objects/cal-auth";

export const onRequestPost = async ({ request }) => {

    const body = await request.text();
    headers["Content-Length"] = String(body.length);

    // AUTHENTICATION
    let apiResp = await fetch("https://connect.cal-online.co.il/col-rest/calconnect/authentication/otp", {
      headers,
      body,
      method
    });

    // @ts-ignore
    const authToken = await apiResp.json().then(rep => rep?.token);

    if (!authToken) return new Response('No token received');

    const authorization = "CALAuthScheme " + authToken;
    // console.log('authorization', authorization);
    headers.authorization = authorization;

    // getting bank/card details
    apiResp = await fetch(calApiUrl + "Authentication/api/account/init", {
        headers, body: "{\"tokenGuid\":\"\"}", method
    });

    const bankAccountAndCards = await apiResp.json() as {
        result: { bankAccounts: { bankAccountUniqueId: any; }[]; cards: any[]; }
    };
    console.log('bankAccountAndCards', JSON.stringify(bankAccountAndCards, null, 2));


    const newData = JSON.stringify({
        bankAccountUniqueID: bankAccountAndCards.result.bankAccounts[0].bankAccountUniqueId,
        cards: bankAccountAndCards.result.cards.map(card => ({
            cardUniqueID: card.cardUniqueId,
            currentDebitDay: card.currentDebitDay,
            brandLogo: card.cardImagesUrl.brandLogo
        })),
        authorization
    });

    return new Response(newData);
}
