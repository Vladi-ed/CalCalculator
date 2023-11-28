import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";
import {read, utils} from "xlsx";
import {ICalRecord} from "../interfaces/ICalRecord";
import {fixDate} from "./fix-date";

/**
 * Processes Excel data and returns an array of ICalRecords
 * @param file - The CSV file to process. Can be of type File or Response
 * @returns An array of parsed records or an empty array if the file is null or undefined.
 */
export async function processExcelData(file: File) {
    const fileContent = await file.arrayBuffer();

    const wb = read(fileContent, { type: 'file' });
    const sheet = wb.Sheets[wb.SheetNames[0]];
    if (sheet["!ref"]) {
        console.log('sheet range', sheet["!ref"]);

        const header = ['date', 'description', 'cost', 'currency', 'chargingDate', 'costNum', 'currencyNis', 'transactionType', 'categoryHeb', 'cardId', 'comment'];
        if (utils.decode_range(sheet["!ref"]).e.c === 11) {
            // if there is more fields than usual
            console.warn('There is 11 columns in the doc')
            const lastElement = header.pop();
            header.push('discount');
            header.push(lastElement!);
        }

        const data = utils.sheet_to_json<ICalRecord>(sheet, { header });
        console.log('Cal Excel Data', data);
        return processDataV3(data);
    }
    else {
        alert('Cannot decode a file');
        return [];
    }
}

function processDataV3(records: ICalRecord[]) {

    // remove first rows (old titles)
    records.shift();
    records.shift();

    // remove summary rows
    records = records.filter(cell => !(cell.date as string).startsWith('עסקאות'));

    console.log(records);

    // add new fields
    records.forEach(line => {

        // convert to US format
        line.date = fixDate(line.date);

        if (line.costNum == undefined) {
            line.costNum = Number(line.cost);
        }

        line.costNis = '₪ ' + line.costNum;

        line.cost = line.currency + ' ' + line.cost;

        // count number of similar operations
        line.count = records.filter(v => v.description == line.description).length;

        // add translation
        line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;

        // add my category
        line.myCategory = vocabulary.find(item =>
            line.description.includes(item.keyword))?.category || categories.find(item => line.categoryHeb?.includes(item.keyword))?.translation || line.categoryHeb;

        // add comments
        if (line.comment) line.comment = comments.find(item => line.comment!.includes(item.keyword))?.translation || line.comment;
    })

    return records;
}
