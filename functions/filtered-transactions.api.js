import {method, headers, calApiUrl} from "../src/app/data-objects/cal-auth";

export const onRequestPost = async ({ request }) => {

    const origRequestBody = await request.json();
    console.log('filtered-transactions.api', JSON.stringify(origRequestBody, null, 2));

    const body = JSON.stringify({
        ...origRequestBody,
        authorization: undefined,
        "merchantHebName": "",
        "merchantHebCity": "",
        "trnType": 0,
        "fromTrnAmt": 0,
        "toTrnAmt": 0,
        "transactionsOrigin": 0,
        "transCardPresentInd": 0
    });

    headers.authorization = origRequestBody.authorization;
    console.log('filteredTransactionsBody', body);

    return fetch(calApiUrl + 'filteredTransactions/getFilteredTransactions', {
        headers,
        body,
        method
    });
}