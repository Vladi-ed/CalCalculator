import { Injectable } from '@angular/core';
import {CalResponse} from "../interfaces/ICalTransactions";

@Injectable({ providedIn: 'root' })
export class CalService {
  private calToken?: string;

  async getCalToken(tz: string, last4Digits: string) {
    const resp = await fetch('/whatsup-auth.api?tz=' + tz + '&last4Digits=' + last4Digits);
    const data = await resp.json();
    console.log('WhatsUp data', data)
    this.calToken = data.token;
    return data.token as string;
  }

  async getData(tz: string, pin: string, offset?: number) {
    const [transactions, processJsonData] = await Promise.all([
      this.#downloadLastMonth(tz, pin, offset),
      import('../functions/process-cal-json-data').then(m => m.processCalJsonData)
    ]);

    if (transactions) return processJsonData(transactions);
    else return [];
  }

  async #downloadLastMonth(tz: string, pin: string, offset = 0) {
    const body = JSON.stringify({
      custID: tz,
      password: pin,
      token: this.calToken
    });

    const month = new Date().getMonth() + (new Date().getDate() > 10 ? 2 : 1) + offset; // till the day of charge
    const year = new Date().getFullYear();
    const resp = await fetch('/cal-download.api?year=' + year + '&month=' + month, { method: 'POST', body });
    const data: CalResponse = await resp.json();
    console.log('Got data from API');
    return data.result.bankAccounts.pop()?.debitDates.pop()?.transactions;
  }

  // async #download3MonthAllCards(tz: string, pin: string) {
  //   const body = JSON.stringify({
  //     custID: tz,
  //     password: pin,
  //     token: this.calToken
  //   });
  //
  //   const resp = await fetch('/cal-download.api', { method: 'POST', body });
  //   const data: CalResponse = await resp.json();
  //   console.log('got data from api', data?.result);
  //   return data.result.transArr;
  // }
}
