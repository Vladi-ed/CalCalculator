import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {sortData} from './functions/sort-data';
import {filterData} from './functions/filter-data';
import {groupArrayBy} from "./functions/group-array-by";
import {processExcelData} from "./functions/process-excel-data";
import {CalResponse} from "./interfaces/ICalTransactions";
import {processJsonData} from "./functions/process-json-data";

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

  graphIsHidden?: boolean;
  @ViewChild('graph', { read: ViewContainerRef }) private graphPlaceholder?: ViewContainerRef;

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

  postProcessing(records: ICalRecord[]) {
    this.calRecords = records;
    this.displayedRecords = records;
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

  showGraph () {
    // if ()
  }

  loadGraph(show: any) {
    console.log(show);
    this.graphIsHidden = !this.graphIsHidden;

    this.graphPlaceholder?.clear();
    import('./components/graph/graph.component').then(c => {
      const graph = this.graphPlaceholder?.createComponent(c.GraphComponent);
      if (graph && this.calRecords) {
        const graphData = Object
            .entries(groupArrayBy(this.calRecords, r => r.myCategory || 'other'))
            .map(entry =>({ name: entry[0], value: calculateTotalSpent(entry[1]) }))
            .sort((a, b) => (a.value > b.value ? -1 : 1));

        console.log('GraphData', graphData);

        graph.instance.chartData = graphData;
        graph.instance.messageEvent.subscribe(cat => this.onGraphCategorySelect(cat));
      }
    });
  }

  onGraphCategorySelect(name: string): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.filterTransactions(name);
    console.log('Filter by ' + name);
    if (this.filter) this.filter.nativeElement.value = name;
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
