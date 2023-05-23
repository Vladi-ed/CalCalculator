import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";
import {groupArrayBy} from "./group-array-by";
import {calculateTotalSpent} from "./calculate-total-spent";
import {read, utils} from "xlsx";
import {ICalRecord} from "../interfaces/ICalRecord";

export async function processExcelData(file: File) {
    const fileContent = await file.arrayBuffer();

    const wb = read(fileContent, { type: 'file' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    // replace 1st row with English titles before JSON conversion
    utils.sheet_add_aoa(sheet, [['date', 'description', 'cost', 'currency', 'chargingDate', 'costNis', 'currency2', 'transactionType', 'category', 'cardId',  'comment']], { origin: "A1" });
    const data = utils.sheet_to_json<ICalRecord>(sheet);
    console.log('Excel Data', data);
    return processDataV3(data);
}

export function processDataV3(records: ICalRecord[]) {

    // remove 2 first rows
    records.shift();
    records.shift();

    // remove summary row in the middle
    const index = records.findIndex(cell => (cell.date as string).includes('עסקאות לחיוב ב'));
    if (index > -1) records.splice(index, 1); // 2nd parameter means remove one item only

    console.log(records);

    const fixDate = (dateStr: any) => {
        const dateSplit = String(dateStr).split('/');
        return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
    }

    // add new fields
    records.forEach(line => {

        line.date = fixDate(line.date);

        // count number of similar operations
        line.count = records.filter(v => v.description == line.description).length;

        // add translation
        line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;

        // add category
        line.myCategory = vocabulary.find(item => line.description.includes(item.keyword))?.category || categories.find(item => line.category?.includes(item.keyword))?.translation;

        // add comments
        if (line.comment) line.comment = comments.find(item => line.comment!.includes(item.keyword))?.translation || line.comment;
    })

    console.timeEnd('File processing');

    return records;
}
