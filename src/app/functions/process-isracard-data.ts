import {read, utils} from "xlsx";
import {ICalRecord} from "../interfaces/ICalRecord";
import {processRecord} from "./process-record";

/**
 * Processes Excel data and returns an array of ICalRecords
 * @param file - The CSV file to process. Can be of type File or Response
 * @returns An array of parsed records or an empty array if the file is null or undefined.
 */
export async function processExcelData(file: File) {
    const fileContent = await file.arrayBuffer();

    const wb = read(fileContent, { type: 'file' });
    const sheet = wb.Sheets[wb.SheetNames[0]];

    const header = ['date', 'description', 'costNum', 'currencyNis', 'cost', 'currency', 'comment'];

    const data = utils.sheet_to_json<ICalRecord>(sheet, { header });
    console.log('IsraCard Excel Data', data);
    return processMaxData(data);
}

function processMaxData(records: ICalRecord[]) {

    // process only date-formatted rows
    // 30/05/2023
    records = records.filter(cell => /^([0-2]\d|3[01])\/(0\d|1[0-2])\/(\d{4})$/.test(cell.date) );

    // add new fields
    records.forEach(record => {

        processRecord(record, '/');

        // count number of similar operations
        record.count = records.filter(v => v.description == record.description).length;
    });

    return records;
}
