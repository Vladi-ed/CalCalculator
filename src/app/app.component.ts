import {Component} from '@angular/core';
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';
import {comments} from "./data-objects/comments";
import {vocabulary} from './data-objects/vocabulary';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  calRecords?: ICalRecord[];
  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'count', 'translation', 'myCategory', 'cost',	'costNis', 'comment'];
  spentTotal?: number;

  // ngOnInit() {
  //    fetch('/coreg-offers.api')
  //     .then(offers => offers.ok ? offers.json() : [])
  //     .then(data => this.vocabulary = data);
  // }
  showGraph: boolean = false;
  chartData: { name: string, value: number } [] = [];
  activeCategory: any;

  onUpload(target: FileList | null) {
    const file = target?.item(0);
    console.time('test');
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
      .map(entry =>({ name: entry[0], value: this.calculateTotalSpent(entry[1]) }))
      .sort((a, b) => (a.value > b.value ? -1 : 1))

    console.log('chartData', this.chartData);
    this.spentTotal = this.calculateTotalSpent(this.displayedRecords);

    console.timeEnd('test');
  }

  filterTransactions(searchStr: string) {
    if (this.calRecords) {
      if (searchStr === 'other') this.displayedRecords = this.calRecords?.filter(col => col.myCategory == undefined);
      else if (searchStr) {
        const sFilter = searchStr.toUpperCase();
        this.displayedRecords = this.calRecords?.filter(col => col.translation?.toUpperCase().includes(sFilter) ||
          col.description.toUpperCase().includes(sFilter) ||
          col.myCategory === searchStr
        );
      }
      else this.displayedRecords = this.calRecords;

      this.spentTotal = this.calculateTotalSpent(this.displayedRecords);
    }
  }

  calculateTotalSpent(myArray: ICalRecord[]) {
    const totalCost = myArray
      .map(t => 100 * t.costNum)
      .reduce((acc, value) => acc + value, 0);

    console.log('totalCost', totalCost);
    return totalCost/100;
  }

  sortData(sort: Sort) {
    const data = this.displayedRecords?.slice();

    function compare(a: any, b: any, isAsc: boolean) {
      if (!a) a = '';
      if (!b) b = '';
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.displayedRecords = data?.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const columnToSort = sort.active as keyof ICalRecord;

      if (columnToSort === 'costNis') return compare(a.costNum, b.costNum, isAsc);
      else return compare(a[columnToSort], b[columnToSort], isAsc);

    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.activeCategory = [{ name: data.name,  value: '#ff6200' }];
    this.filterTransactions(data.name);
  }
}
