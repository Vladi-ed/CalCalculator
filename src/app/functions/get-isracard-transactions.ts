import {CardTransactions, IsracardResponse} from "../interfaces/IIsraTransactions";
import {IRecord} from "../interfaces/IRecord";

export async function getIsracardTransactions(tz: string, last6Digits: string, pin: string) {

    const israUrl = new URL(location.href + 'isracard-authentication.api');
    israUrl.searchParams.set('tz', tz);
    israUrl.searchParams.set('last6Digits', last6Digits);
    israUrl.searchParams.set('code', pin);

    const resp = await fetch(israUrl.href);
    const data = await resp.json() as IsracardResponse;

    let allTxns = [];
    data.CardsTransactionsListBean.Index0.CurrentCardTransactions.forEach((txnGroup) => {
        if (txnGroup.txnIsrael) {
            const txns = convertTransactions(txnGroup.txnIsrael);
            allTxns.push(...txns);
        }
        if (txnGroup.txnAbroad) {
            const txns = convertTransactions(txnGroup.txnAbroad);
            allTxns.push(...txns);
        }
    });

    function convertTransactions(txns: CardTransactions[]): IRecord[] {
        const filteredTxns = txns.filter((txn) => txn.dealSumType !== '1' &&
            txn.voucherNumberRatz !== '000000000' &&
            txn.voucherNumberRatzOutbound !== '000000000');

        return filteredTxns.map(txn => {
            const isOutbound = txn.dealSumOutbound;
            const txnDateStr = isOutbound ? txn.fullPurchaseDateOutbound : txn.fullPurchaseDate;

            return {
                // identifier: parseInt(isOutbound ? txn.voucherNumberRatzOutbound : txn.voucherNumberRatz, 10),
                date: new Date(txnDateStr).toISOString(),
                // processedDate: txn.fullPaymentDate ? new Date(txn.fullPaymentDate).toISOString() : txn.fullPaymentDate,
                cost: isOutbound ? txn.dealSumOutbound : txn.dealSum,
                currency: txn.currencyId || 'shekels',
                costNum: isOutbound ? txn.paymentSumOutbound : txn.paymentSum,
                description: isOutbound ? txn.fullSupplierNameOutbound : txn.fullSupplierNameHeb,
                comment: txn.moreInfo,
                count: 1,
                costNis: txn.currencyId + txn.paymentSum
            };
        });
    }

    console.log('Got data from isracard-authentication.api', data.CardsTransactionsListBean.Index0.CurrentCardTransactions);
}
