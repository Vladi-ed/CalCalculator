import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";
import {read, utils} from "xlsx";
import {ICalRecord} from "../interfaces/ICalRecord";

/**
 * Processes Excel data and returns an array of ICalRecords
 * @param file - The CSV file to process. Can be of type File or Response
 * @returns An array of parsed records or an empty array if the file is null or undefined.
 */
export async function processExcelData(file: File) {
    const fileContent = await file.arrayBuffer();

    const wb = read(fileContent, { type: 'file' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    // replace 1st row with English titles before JSON conversion
    utils.sheet_add_aoa(sheet, [['date', 'description', 'cost', 'currency', 'chargingDate', 'costNum', 'currency2', 'transactionType', 'categoryHeb', 'cardId',  'comment']], { origin: "A1" });
    const data = utils.sheet_to_json<ICalRecord>(sheet);
    console.log('Excel Data', data);
    return processDataV3(data);
}

function processDataV3(records: ICalRecord[]) {

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

        // @ts-ignore
        line.costNis = line.currency + ' ' + line.costNum;

        // count number of similar operations
        line.count = records.filter(v => v.description == line.description).length;

        // add translation
        line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;

        // add category
        line.myCategory = vocabulary.find(item => line.description.includes(item.keyword))?.category || categories.find(item => line.categoryHeb?.includes(item.keyword))?.translation;

        // add comments
        if (line.comment) line.comment = comments.find(item => line.comment!.includes(item.keyword))?.translation || line.comment;
    })

    return records;
}
