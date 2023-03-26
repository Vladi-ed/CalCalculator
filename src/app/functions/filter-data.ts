import {ICalRecord} from "../interfaces/ICalRecord";

export function filterData(records: ICalRecord[], searchStr: string): ICalRecord[] {

    if (searchStr === 'other') return records.filter(col => col.myCategory == undefined);
    else if (searchStr) {
      const sFilter = searchStr.toUpperCase();
      return records.filter(col => col.translation?.toUpperCase().includes(sFilter) ||
        col.description.toUpperCase().includes(sFilter) ||
        col.myCategory === searchStr
      );
    }
    else return records;

}
