import {apiUrl, authMethod, headers} from "../src/app/data-objects/isracard-auth";
import {IIsraDetails} from "../src/app/interfaces/IIsraDetails";

export const onRequestGet: PagesFunction = async ({ request }) => {

    const requestParams = new URL(request.url).searchParams;
    const last6Digits = requestParams.get('last6Digits');
    const taudatZehut = requestParams.get('tz');
    const code = requestParams.get('code');

    if (!last6Digits || !taudatZehut) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

    const body = new FormData();
    body.append('id', taudatZehut);
    body.append('cardSuffix', last6Digits);
    body.append('otp', code);
    body.append('idType', '1');
    body.append('countryCode', '212');
    body.append('kodChevra', '11');

    const validateLogin = await fetch(apiUrl + "ValidateLoginOtpNoReg", {
        headers,
        body,
        method: authMethod
    });

    const cookieStorage = new CookieStorage(validateLogin.headers.getAll("set-cookie"));
    console.log('1. Cookie for performLogonOtpNoReg', cookieStorage.toString());

    body.delete('id');
    body.delete('otp');
    body.delete('kodChevra');
    body.append('KodEretz', '212');
    body.append('MisparZihuy', taudatZehut);
    body.append('isGoogleCaptcha', 'true');
    headers['Cookie'] = cookieStorage.toString();

    const performLogin = await fetch(apiUrl + "performLogonOtpNoReg", {
        headers,
        body,
        method: authMethod
    });

    console.log('2. respHeaders for performLogonOtpNoReg', performLogin.headers);

    cookieStorage.addNewCookies(performLogin.headers.getAll("set-cookie"));

    headers.Referer = 'https://digital.isracard.co.il/personalarea/transaction-list/';
    headers['Cookie'] = cookieStorage.toString().split('; TS01')[0];

    console.log('3. Last request headers:', headers);



    const cardsTransactionsResp = await fetch(getTransactionsUrl(9, 2023), {
    // const cardsTransactionsResp = await fetch(apiUrl + "CardsList_102Digital", {
        headers,
        method: 'GET',
    });

    console.log('4. cardsTransactionsResp cookies', cardsTransactionsResp.headers.getAll("set-cookie"));

    return new Response(cardsTransactionsResp.body, { headers: {
                "content-type": "application/json;charset=UTF-8",
            }
        }
    );
}

class CookieStorage {

    #cookieMap = new Map<string, string>();

    constructor(setCookieStrings: string[]) {
        this.addNewCookies(setCookieStrings);
    }

    // This function takes an array of 'Set-Cookie' headers and returns a Map object with cookie names and values
    addNewCookies(headers: string[]) {
        for (let header of headers) {
            // Split the header by ';' to get the cookie attributes
            let attributes = header.split(';');
            // The first attribute is the cookie name and value, separated by '='
            let [name, value] = attributes[0].split('=');
            // Trim any whitespace from the name and value
            name = name.trim();
            value = value.trim();
            // Set the name and value as a key-value pair in the Map object
            this.#cookieMap.set(name, value);
        }
    }

    toString(){
        // Create an empty array to store the cookie strings
        let cookieStrings = [];
        // Loop through each entry in the Map object
        for (const [name, value] of this.#cookieMap) {
            // Concatenate the name and value with '=' and push it to the array
            cookieStrings.push(name + '=' + value);
        }
        // Return the array
        return cookieStrings.join('; ');
    }

    get sessionId() {
        return this.#cookieMap.get('JSESSIONID');
    }

    get aspNetSessionId() {
        return this.#cookieMap.get('ASP.NET_SessionId');
    }
}

function getTransactionsUrl(month: number, year: number | string) {
    const monthStr = month < 10 ? `0${month}` : month.toString();
    return apiUrl + `CardsTransactionsList&month=${monthStr}&year=${year}`;
}


function getTransactionExtraDetailsUrl(transaction: IIsraDetails, moedChiuv = '102023', accountIndex = 0): string {
    //https://digital.isracard.co.il/services/ProxyRequestHandler.ashx?reqName=PirteyIska_204&userGuid=7ad4a87b-f78c-45a0-0000-2ef41ab4c679&CardIndex=0&moedChiuv=082023&inState=yes&shovarRatz=925588714
    // const moedChiuv = month.format('MMYYYY');

    const transactionId = transaction.voucherNumberRatzOutbound || transaction.voucherNumberRatz;

    return apiUrl + `PirteyIska_204&CardIndex=${accountIndex}&shovarRatz=${transactionId}&moedChiuv=${moedChiuv}`;
}

async function getExtraScrapTransaction(transaction: IIsraDetails): Promise<IIsraDetails> {
    const dataUrl = getTransactionExtraDetailsUrl(transaction);
    const data = await fetch(dataUrl).then(data1 => data1.json()) as any;
    const rawCategory = data.PirteyIska_204Bean.sector;
    return {
        ...transaction,
        sector: rawCategory.trim(), // category
    };
}