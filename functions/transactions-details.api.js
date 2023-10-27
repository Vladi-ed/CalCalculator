import {method, headers, calApiUrl} from "../src/app/data-objects/cal-auth";

export const onRequestPost = async ({ request }) => {

    const origRequestBody = await request.json();
    console.log('origRequestBody', JSON.stringify(origRequestBody, null, 2));

    const body = JSON.stringify({
        ...origRequestBody,
        authorization: undefined,
    });

    headers.authorization = origRequestBody.authorization;
    console.log('transactionsDetailsBody', body);

    return fetch(calApiUrl + 'transactionsDetails/getCardTransactionsDetails', {
        headers,
        body,
        method
    });
}