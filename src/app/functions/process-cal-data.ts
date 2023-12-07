import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";
import {read, utils} from "xlsx";
import {ICalRecord} from "../interfaces/ICalRecord";
import {fixDate} from "./fix-date";

/**
 * Processes Excel data and returns an array of ICalRecords
 * @param file - The Excel file to process.
 * @returns An array of parsed records or an empty array if the file is null or undefined.
 */
export async function processExcelData(file: File) {
    const fileContent = await file.arrayBuffer();

    const wb = read(fileContent, { type: 'file' });
    const sheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[sheetName];
    if (sheet["!ref"]) {
        // console.log('Sheet range', sheet["!ref"]);
        console.log('Sheet Name', sheetName);

        if (sheetName === 'פירוט עסקאות וזיכויים') {

            // const header = ['date', 'description', 'cost', 'currency', 'chargingDate', 'costNum', 'currencyNis', 'transactionType', 'categoryHeb', 'cardId', 'comment'];
            const header = ['date', 'description', 'cost', 'chargingDate', 'transactionType', 'cardId', 'comment'];

            // if there are more fields than usual
            if (utils.decode_range(sheet["!ref"]).e.c === 7) {
                console.log('There is a "discount" column in the table')
                const lastElement = header.pop();
                header.push('discount');
                header.push(lastElement!);
            }

            const data = utils.sheet_to_json<ICalRecord>(sheet, {header, range: 2});
            data.pop(); // remove summary row

            console.log('Custom period Cal Excel Data', data);
            return processDataForCustomPeriod(data, true);
        }
        else {
            const header = ['date', 'description', 'cost', 'costNum', 'transactionType', 'categoryHeb', 'comment'];
            const data = utils.sheet_to_json<ICalRecord>(sheet, {header, range: 4, raw: false});

            if (data[0].date === 'תאריך עסקה') data.shift();

            console.log('Monthly Cal Excel Data', data);
            return processDataForCustomPeriod(data);

        }
    }
    else {
        alert('Cannot decode a file');
        return [];
    }
}

function processDataForCustomPeriod(records: ICalRecord[], fixDateRequired?: boolean) {

    // add new fields
    records.forEach(line => {

        // convert Date to US format if required
        if (fixDateRequired) line.date = fixDate(line.date);
        if (line.costNum === undefined) line.costNum = Number(line.cost);
        line.costNis = '₪ ' + line.costNum;

        // line.cost = line.costNis;
        if (line.cost == String(line.costNum)) line.cost = line.costNis;

        // count number of similar operations
        line.count = records.filter(v => v.description == line.description).length;

        // add translation
        line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;

        // add my category
        line.myCategory = vocabulary.find(item =>
            line.description.includes(item.keyword))?.category || categories.find(item => line.categoryHeb?.includes(item.keyword))?.translation || line.categoryHeb;

        // add comments
        if (line.comment) line.comment = comments.find(item => line.comment!.includes(item.keyword))?.translation || line.comment;
    });

    console.log(records);

    return records;
}
