import {Transaction} from "../interfaces/ICalTransactions";
import {IRecord} from "../interfaces/IRecord";
import {processRecordTranslation} from "./process-record";

export function processCalJsonData(data: Transaction[]) {
    return data.map<IRecord>((transaction, _index, records) => {

        const calRecord: IRecord = {
            date: transaction.trnPurchaseDate,
            description: transaction.merchantName,
            cost: transaction.trnCurrencySymbol + ' ' + transaction.trnAmt,
            currency: transaction.trnCurrencySymbol,
            costNis: transaction.debCrdCurrencySymbol + ' ' + transaction.amtBeforeConvAndIndex,
            costNum: transaction.amtBeforeConvAndIndex,
            comment : transaction.comments?.length ? JSON.stringify(transaction.comments) : transaction.onGoingTransactionsComment,
            transactionType: transaction.trnType,
            categoryHeb: transaction.branchCodeDesc || undefined,
            address: transaction.merchantAddress,
            count: 0,
            ...Object.fromEntries(Object.entries(transaction).filter(([_, v]) => !!v && v.length )) // copy all transaction fields except null, undefined or empty
        }

        processRecordTranslation(calRecord);

        // count number of similar operations
        calRecord.count = records.filter(v => v.merchantName == calRecord.description).length;

        return calRecord;
    });
}
