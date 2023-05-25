import {Component, ElementRef, ViewChild} from '@angular/core';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {sortData} from './functions/sort-data';
import {filterData} from './functions/filter-data';
import {groupArrayBy} from "./functions/group-array-by";
import {processExcelData} from "./functions/process-excel-data";
import {CalResponse} from "./interfaces/ICalTransactions";
import {processJsonData} from "./functions/process-json-data";
type GraphData = { name: string, value: number };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calRecords?: ICalRecord[];
  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'translation', 'cost', 'costNis', 'myCategory', 'count', 'comment'];
  spentTotal?: number;

  showGraph = false;
  graphData: GraphData[] = [];
  activeCategory?: { name: string; value: string }[];
  private sort?: Sort;
  @ViewChild('filter') private filter?: ElementRef;
  calToken = '';

  onUpload(target: HTMLInputElement) {
    const file = target.files?.item(0);
    console.time('File processing');

    if (file?.name.endsWith('.xlsx')) {
      processExcelData(file).then(records => this.postProcessing(records));
    }
  }

  onLoadPreset() {
    console.time('File processing');
    fetch('assets/trans-example-month.json')
        .then(respFile => respFile.json())
        .then(data => this.postProcessing(processJsonData(data.result.transArr)));
  }

  private postProcessing(records: ICalRecord[]) {
    this.calRecords = records;
    this.displayedRecords = records;
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
    this.graphData = Object.entries(groupArrayBy(records, r => r.myCategory || 'other'))
        .map(([name, value]) => ({ name, value: calculateTotalSpent(value) }))
        .sort((a, b) => b.value - a.value);

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

  onGraphCategorySelect({ name }: GraphData): void {
    this.activeCategory = [{ name,  value: '#ff6200' }];
    this.filter!.nativeElement.value = name;
    this.filterTransactions(name);
  }

  async getCalToken(event: Event) {
    event.preventDefault();

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
    resp.json().then((data: CalResponse) => {
      // data.result.transArr
      console.log('got data from api', data?.result);

      this.postProcessing(processJsonData(data.result.transArr));

    }).catch(console.warn);
  }
}
