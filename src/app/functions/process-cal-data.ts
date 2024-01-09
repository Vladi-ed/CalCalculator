import {read, utils} from "xlsx";
import {IRecord} from "../interfaces/IRecord";
import {processRecord} from "./process-record";

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

            const data = utils.sheet_to_json<IRecord>(sheet, {header, range: 2});
            data.pop(); // remove summary row

            console.log('Custom period Cal Excel Data', data);
            return processDataForCustomPeriod(data, '/');
        }
        else {
            const header = ['date', 'description', 'cost', 'costNum', 'transactionType', 'categoryHeb', 'comment'];
            const data = utils.sheet_to_json<IRecord>(sheet, {header, range: 4, raw: false});

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

function processDataForCustomPeriod(records: IRecord[], fixDateRequired?: string) {

    // add new fields
    records.forEach(calRecord => {

        processRecord(calRecord, fixDateRequired);

        // count number of similar operations
        calRecord.count = records.filter(v => v.description == calRecord.description).length;
    });

    return records;
}
