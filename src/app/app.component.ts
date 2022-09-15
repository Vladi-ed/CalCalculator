import {Component} from '@angular/core';
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';
import {vocabulary} from "./vocabulary";
import {ICalRecord} from "./ICalRecord";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calCalculator';
  transactions: ICalRecord[] = [];
  filteredRecords: ICalRecord[] = [];
  displayedColumns = ['date',	'description', 'cost',	'costNis', 'comment'];

  onUpload(target: any) {
    const file = (target as HTMLInputElement).files?.item(0);
    file?.text().then(fileContent => this.processDataV2(fileContent));
  }

  processDataV2(content: string) {

    const records: ICalRecord[] = csvParseToObject(content, {
      columns: this.displayedColumns,
      fromLine: 4,
      delimiter: '\t',
      relaxColumnCountLess: true,
      relaxQuotes: true
    });

    records.pop(); // removes summary

    records.forEach(line => {
      // count number of similar operations
      line.count = records.filter(v => v.description == line.description).length;

      // add translation
      line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation;
    })

    console.log(records);
    this.transactions = records;
    this.filteredRecords = records;
  }

  filterTransactions(s: string) {
    if (s) this.filteredRecords = this.transactions.filter(columns => columns.translation?.toLowerCase().includes(s.toLowerCase()));
    else this.filteredRecords = this.transactions;
  }

  applyFilter($event: KeyboardEvent) {

  }

  getTotalCost() {
    return this.filteredRecords.map(t => Number(t.costNis.substring(2))).reduce((acc, value) => acc + value, 0);
    // return 55;
  }
}
