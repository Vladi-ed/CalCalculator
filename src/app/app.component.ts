import {Component, ElementRef, ViewChild} from '@angular/core';
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';
import {comments} from "./data-objects/comments";
import {vocabulary} from './data-objects/vocabulary';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from "./functions/calculate-total-spent";
import {sortData} from "./functions/sort-data";
import {filterData} from "./functions/filter-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calRecords?: ICalRecord[];
  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'count', 'translation', 'myCategory', 'cost',	'costNis', 'comment'];
  spentTotal?: number;

  showGraph: boolean = false;
  chartData: { name: string, value: number } [] = [];
  activeCategory: any;
  private sort?: Sort;
  @ViewChild('filter') private filter?: ElementRef;

  onUpload(target: FileList | null) {
    const file = target?.item(0);
    console.time('File processing');
    // file?.text().then(fileContent => this.processDataV2(fileContent));
    // file?.stream().getReader().read().then(fileContent => this.processDataV2(fileContent.value || ''));
    // this.processDataV2(file?.slice().text())

    file?.arrayBuffer().then(fileContent => this.processDataV2(new Uint8Array(fileContent, 70)));

    // file?.arrayBuffer()
    //   .then(fileContent => {
    //     const z = new Uint8Array(fileContent, 70);
    //     console.log(new TextDecoder().decode(z))
    //     this.processDataV2(z);
    //   });
  }

  processDataV2(content: Uint8Array | string) {
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


    records.pop(); // removes summary
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

    console.log(records);

    this.calRecords = records;
    this.displayedRecords = records;

    const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
      array.reduce((acc, value, index, array) => {
        (acc[predicate(value, index, array)] ||= []).push(value);
        return acc;
      }, {} as { [key: string]: T[] });

    this.chartData = Object
      .entries(groupBy(records, r => r.myCategory || 'other'))
      .map(entry =>({ name: entry[0], value: calculateTotalSpent(entry[1]) }))
      .sort((a, b) => (a.value > b.value ? -1 : 1))

    console.log('chartData', this.chartData);
    this.spentTotal = calculateTotalSpent(this.displayedRecords);

    console.timeEnd('File processing');
  }

  filterTransactions(searchStr: string) {
    if (this.calRecords) {
      this.displayedRecords = sortData(filterData(this.calRecords, searchStr), this.sort);
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
    }
  }

  clearFilter(filter: HTMLInputElement) {
    filter.value = '';
    this.displayedRecords = sortData(this.calRecords, this.sort);
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
  }

  sortTransactions(sort: Sort) {
    this.sort = sort;
    this.displayedRecords = sortData(this.displayedRecords, sort);
  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.activeCategory = [{ name: data.name,  value: '#ff6200' }];
    this.filterTransactions(data.name);
    console.log(this.filter)
    if (this.filter) this.filter.nativeElement.value = data.name;
  }

  async download() {
    const resp = await fetch('/cal-download.api');
    if (resp.ok) resp.arrayBuffer().then(data => this.processDataV2(new Uint8Array(data, 70)));
    else console.error(resp.statusText);
  }
}
