import {Transaction} from "../interfaces/ICalTransactions";
import {ICalRecord} from "../interfaces/ICalRecord";
import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";

export function processJsonData(data: Transaction[]) {
    return data.map<ICalRecord>((transaction, index, transArr) => {

        const calRecord: ICalRecord = {
            date: transaction.trnPurchaseDate,
            description: transaction.merchantName,
            cost: transaction.trnCurrencySymbol + ' ' + transaction.trnAmt,
            costNis: transaction.debCrdCurrencySymbol + ' ' + transaction.amtBeforeConvAndIndex,
            costNum: transaction.amtBeforeConvAndIndex,
            comment : transaction.comments?.length ? JSON.stringify(transaction.comments) : transaction.onGoingTransactionsComment,
            transactionType: transaction.trnType,
            categoryHeb: transaction.branchCodeDesc || undefined,
            count: 0
        }

        // count number of similar operations
        calRecord.count = transArr.filter(v => v.merchantName == calRecord.description).length;

        // add translation
        calRecord.translation = vocabulary.find(item => calRecord.description.includes(item.keyword))?.translation;

        // add my category
        calRecord.myCategory = vocabulary.find(item =>
                calRecord.description.includes(item.keyword))?.category || categories.find(item => calRecord.categoryHeb?.includes(item.keyword))?.translation;

        // add comments
        if (calRecord.comment) calRecord.comment = comments.find(item => calRecord.comment!.includes(item.keyword))?.translation || calRecord.comment;

        return calRecord;
    });
}
