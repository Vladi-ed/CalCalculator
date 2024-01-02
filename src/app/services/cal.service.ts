import { Injectable } from '@angular/core';
import {CalResponse} from "../interfaces/ICalTransactions";

@Injectable({ providedIn: 'root' })
export class CalService {
  private calToken?: string;
  private accountInitResp!: { bankAccountUniqueId: string; cards: { cardUniqueID: string; currentDebitDay: number }[]; authorization: string; };

  async getCalToken(tz: string, last4Digits: string) {
    const resp = await fetch('/cal-whatsup-code.api?tz=' + tz + '&last4Digits=' + last4Digits);
    const data: {token: string, phoneNumber: string} = await resp.json();
    console.log('WhatsUp data', data)
    this.calToken = data.token;
    return data.token;
  }

  async getData(offset?: number) {
    const [transactions, processJsonData] = await Promise.all([
      this.#downloadOneMonth(offset),
      import('../functions/process-cal-json-data').then(m => m.processCalJsonData)
    ]);

    if (transactions) return processJsonData(transactions);
    else return [];
  }

  async accountInit(tz: string, pin: string) {
    const body = JSON.stringify({
      custID: tz,
      password: pin,
      token: this.calToken
    });

    const resp = await fetch('/cal-authentication.api', { method: 'POST', body });
    const data = await resp.json();
    console.log('Got data from accountInit()', data);
    this.accountInitResp = data;
  }

  async #download3MonthAllCards() {

    const threeMonthAgo = new Date();
    threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 2);

    const body = JSON.stringify({
      bankAccountUniqueID: this.accountInitResp.bankAccountUniqueId,
      cards: this.accountInitResp.cards, // for all credit cards
      fromTransDate: threeMonthAgo.toISOString(),
      toTransDate: new Date().toISOString(),
      authorization: this.accountInitResp.authorization
    });

    const resp = await fetch('/cal-transactions-any.api', { method: 'POST', body });
    const data: CalResponse = await resp.json();
    console.log('download3MonthAllCards()', data?.result);
    return data.result.transArr;
  }

  async #downloadOneMonth(offset = 0) {

    let month = String(new Date().getMonth()
        + (new Date().getDate() > this.accountInitResp.cards[0].currentDebitDay ? 2 : 1) + offset); // till the day of charge

    let year = new Date().getFullYear();

    if (month === '13') {
      month = '1';
      year++;
    }

    const body = JSON.stringify({
      cardUniqueId: this.accountInitResp.cards[0].cardUniqueID, // for the first credit card
      month,
      year: String(year),
      authorization: this.accountInitResp.authorization
    })

    const resp = await fetch('/cal-transactions-month.api', { method: 'POST', body });
    const data: CalResponse = await resp.json();
    console.log('downloadLastMonth()', data?.result);
    return data.result.bankAccounts.pop()?.debitDates.pop()?.transactions;
  }
}
