import {vocabulary} from "../data-objects/vocabulary";
import {comments} from "../data-objects/comments";
import {ICalRecord} from "../interfaces/ICalRecord";
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';

export async function processCSVData(file: File | Response | null | undefined) {
    if (!file) return [];

    const fileContent = await file.arrayBuffer();
    const content = new Uint8Array(fileContent, 70);

    const records: ICalRecord[] = csvParseToObject((content as any), {
        columns: ['date',	'description', 'cost',	'costNis', 'comment'],
        fromLine: 4,
        encoding: 'utf16le',
        delimiter: '\t',
        relaxColumnCountLess: true,
        relaxQuotes: true,
        cast: (cellValue, context) => {
            if (context.index == 0) {
                // convert to US date format
                const dateSplit = cellValue.split('/');
                return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
            }
            else if (context.index == 4) return comments.find(item => cellValue.includes(item.keyword))?.translation || cellValue;
            else return cellValue;
        }
    });

    // removes summary
    records.pop();

    // add new fields
    records.forEach(line => {
        // count number of similar operations
        line.count = records.filter(v => v.description == line.description).length;

        // add translation
        line.translation = vocabulary?.find(item => line.description.includes(item.keyword))?.translation;

        // add category
        line.myCategory = vocabulary?.find(item => line.description.includes(item.keyword))?.category;

        // convert costNis to number
        line.costNum = Number(line.costNis.replace(/[^0-9.-]+/g, ''));
    })

    // console.log(records);

    return records;
}
