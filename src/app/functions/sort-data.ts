import {Sort} from "@angular/material/sort";
import {ICalRecord} from "../interfaces/ICalRecord";

/**
 * Sort ICalRecords for the Mat Table
 * @returns sorted array of ICalRecord
 */
export function sortData(records?: ICalRecord[], sort?: Sort) : ICalRecord[] {

  if (!records) return [];
  if (!sort) return records;

  return records.slice().sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    const columnToSort = sort.active as keyof ICalRecord;

    if (columnToSort === 'costNis') return compare(a.costNum, b.costNum, isAsc);
    else return compare(a[columnToSort], b[columnToSort], isAsc);
  });
}

function compare(a: any, b: any, isAsc: boolean) {
  if (!a) a = '';
  if (!b) b = '';
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
