import {Component, ElementRef, ViewChild} from '@angular/core';
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';
import {comments} from './data-objects/comments';
import {vocabulary} from './data-objects/vocabulary';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {sortData} from './functions/sort-data';
import {filterData} from './functions/filter-data';
import { read, utils } from 'xlsx';
import {categories} from "./data-objects/categories";
import {groupArrayBy} from "./functions/group-array-by";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calRecords?: ICalRecord[];
  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'count', 'translation', 'cost', 'costNis', 'myCategory', 'comment'];
  spentTotal?: number;

  showGraph = false;
  chartData: { name: string, value: number } [] = [];
  activeCategory: any;
  private sort?: Sort;
  @ViewChild('filter') private filter?: ElementRef;
  calToken = '';

  onUpload(target: HTMLInputElement) {
    const file = target.files?.item(0);
    console.time('File processing');

    if (file?.name.endsWith('.xlsx'))
      file?.arrayBuffer().then(fileContent => {
        const wb = read(fileContent, { type: 'file' });
        const sheet = wb.Sheets[wb.SheetNames[0]];
        // replace 1st row with English titles
        utils.sheet_add_aoa(sheet, [['date', 'description', 'cost', 'currency', 'chargingDate', 'costNis', 'currency2', 'transactionType', 'category', 'cardId',  'comment']], { origin: "A1" });
        const data = utils.sheet_to_json<ICalRecord>(sheet);
        console.log(data);
        this.processDataV3(data);
      });
    else
      file?.arrayBuffer().then(fileContent => this.processDataV2(new Uint8Array(fileContent, 70)));
  }

  onLoadPreset() {
    console.time('File processing');
    fetch('assets/Transactions_example.xls')
        .then(file => file.arrayBuffer())
        .then(fileContent => this.processDataV2(new Uint8Array(fileContent, 70)));
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

    this.calRecords = records;
    this.displayedRecords = records;

    this.chartData = Object
      .entries(groupArrayBy(records, r => r.myCategory || 'other'))
      .map(entry =>({ name: entry[0], value: calculateTotalSpent(entry[1]) }))
      .sort((a, b) => (a.value > b.value ? -1 : 1))

    console.log('chartData', this.chartData);
    this.spentTotal = calculateTotalSpent(this.displayedRecords);

    console.timeEnd('File processing');
  }

  processDataV3(records: any[]) {

    // remove 2 first rows
    records.shift();
    records.shift();

    // remove summary row in the middle
    const index = records.findIndex(cell => (cell.date as string).includes('עסקאות לחיוב ב'));
    if (index > -1) records.splice(index, 1); // 2nd parameter means remove one item only

    console.log(records);

    const fixDate = (dateStr: any) => {
      const dateSplit = String(dateStr).split('/');
      return dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
    }

    // add new fields
    records.forEach(line => {

      line.date = fixDate(line.date);

      // count number of similar operations
      line.count = records.filter(v => v.description == line.description).length;

      // add translation
      line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;

      // add category
      line.myCategory = vocabulary.find(item => line.description.includes(item.keyword))?.category || categories.find(item => line.category.includes(item.keyword))?.translation;

      // add comments
      if (line.comment) line.comment = comments.find(item => line.comment.includes(item.keyword))?.translation || line.comment;
    })

    this.calRecords = records;
    this.displayedRecords = records;

    this.chartData = Object
        .entries(groupArrayBy(records, r => r.myCategory || 'other'))
        .map(entry =>({ name: entry[0], value: calculateTotalSpent(entry[1]) }))
        .sort((a, b) => (a.value > b.value ? -1 : 1))

    // console.log('chartData', this.chartData);
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

  onGraphSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.activeCategory = [{ name: data.name,  value: '#ff6200' }];
    this.filterTransactions(data.name);
    console.log(this.filter)
    if (this.filter) this.filter.nativeElement.value = data.name;
  }

  async getCalToken() {
    const resp = await fetch('/whatsup-auth.api?tz=' + this.filter?.nativeElement.value + '&last4Digits=9500');
    if (resp.ok) resp.json().then(data => this.calToken = data.token);
    else console.error(resp.statusText);
  }

  async download(password: string) {
    const body = JSON.stringify({
      "custID": this.filter?.nativeElement.value,
      password,
      "token": this.calToken
    });
    const resp = await fetch('/cal-download.api', { method: 'POST', body });
    if (resp.ok) resp.json().then(console.log);
    else console.error(resp.statusText);
  }
}
