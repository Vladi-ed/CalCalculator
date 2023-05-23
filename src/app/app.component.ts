import {Component, ElementRef, ViewChild} from '@angular/core';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {sortData} from './functions/sort-data';
import {filterData} from './functions/filter-data';
import {groupArrayBy} from "./functions/group-array-by";
import {processExcelData} from "./functions/process-excel-data";
import {processCSVData} from "./functions/process-csv-data";

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

    if (file?.name.endsWith('.xlsx')) {
      processExcelData(file).then(records => this.postProcessing(records));
    }
    else
      processCSVData(file).then(records => this.postProcessing(records));
  }

  onLoadPreset() {
    console.time('File processing');
    fetch('assets/Transactions_example.xls')
        .then(respFile => processCSVData(respFile).then(records => this.postProcessing(records)));
  }

  postProcessing(records: ICalRecord[]) {
    this.calRecords = records;
    this.displayedRecords = records;
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
    this.chartData = Object
        .entries(groupArrayBy(records, r => r.myCategory || 'other'))
        .map(entry =>({ name: entry[0], value: calculateTotalSpent(entry[1]) }))
        .sort((a, b) => (a.value > b.value ? -1 : 1))

    // console.log('chartData', this.chartData);
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
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
    resp.json().then(data => {
      console.log('whatsup data', data)
      this.calToken = data.token
    });
  }

  async download(password: string) {
    const body = JSON.stringify({
      "custID": this.filter?.nativeElement.value,
      password,
      "token": this.calToken
    });

    const resp = await fetch('/cal-download.api', { method: 'POST', body });
    resp.json().then(data => {
      // data.result.transArr
      console.log('mydata', data)
    });
  }
}
