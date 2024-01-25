import {IRecord} from "../interfaces/IRecord";
import {vocabulary} from "../data-objects/vocabulary";
import {categories} from "../data-objects/categories";
import {comments} from "../data-objects/comments";
import {fixDate} from "./fix-date";

export function processRecord(record: IRecord, fixDateSeparator?: string) {
    // convert to US format if needed
    if (fixDateSeparator) record.date = fixDate(record.date, fixDateSeparator);

    if (record.costNum == undefined) record.costNum = Number(record.cost);

    record.costNis = '₪ ' + record.costNum;

    if (record.currency) record.cost = record.currency + ' ' + record.cost;
    else if (!isNaN(record.cost as any)) record.cost = '₪ ' + record.cost;

    processRecordTranslation(record);
}

export function processRecordTranslation(record: IRecord) {
    // add translation
    record.translation = vocabulary.find(item => record.description.includes(item.keyword))?.translation;

    // add my category
    record.myCategory =
        vocabulary.find(item => record.description.includes(item.keyword))?.category
        || categories.find(item => record.categoryHeb?.includes(item.keyword))?.translation
        || record.categoryHeb;

    // add comments
    if (record.comment) record.comment = comments.find(item => record.comment!.includes(item.keyword))?.translation || record.comment;
}