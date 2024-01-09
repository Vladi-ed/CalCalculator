import {IRecord} from "../interfaces/IRecord";

/**
 * Filter array of ICalRecords by search string
 * @param records array of Cal records
 * @param searchStr what to find in the array
 * @returns filtered array of Cal records depending on search query using 'translation', 'description', 'myCategory', 'comment' fields
 */
export function filterData(records: IRecord[], searchStr: string): IRecord[] {

    if (searchStr === 'other') return records.filter(col => col.myCategory == undefined || col.myCategory == 'other');
    else if (searchStr) {
      const sFilter = searchStr.toUpperCase();
      return records.filter(col => col.translation?.toUpperCase().includes(sFilter) ||
        col.description.toUpperCase().includes(sFilter) ||
        col.myCategory === searchStr ||
        // @ts-ignore
        new Date(col.date).getDate() == sFilter
      );
    }
    else return records;
}
