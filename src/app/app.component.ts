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
  calRecords: ICalRecord[] = [];
  filteredRecords: ICalRecord[] = [];
  initialColumns = ['date',	'description', 'cost',	'costNis', 'comment'];
  displayedColumns = this.initialColumns;
  spentTotal?: number;

  onUpload(target: any) {
    const file = (target as HTMLInputElement).files?.item(0);
    file?.text().then(fileContent => this.processDataV2(fileContent));
  }

  processDataV2(content: string) {

    const records: ICalRecord[] = csvParseToObject(content, {
      columns: this.initialColumns,
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

    this.displayedColumns = [...this.initialColumns];
    this.displayedColumns.splice(2, 0, 'count', 'translation');
    this.calRecords = records;
    this.filteredRecords = records;

    this.calculateTotalSpent();
  }

  filterTransactions(s: string) {
    if (s) {
      const sFilter = s.toUpperCase();
      this.filteredRecords = this.calRecords.filter(col => col.translation?.toUpperCase().includes(sFilter) || col.description.includes(sFilter));
    }
    else this.filteredRecords = this.calRecords;

    this.calculateTotalSpent();
  }

  calculateTotalSpent() {
    const totalCost = this.filteredRecords
      .map(t => 100 * Number(t.costNis.replace(/[^0-9.-]+/g,'')))
      .reduce((acc, value) => acc + value, 0);
    console.log('totalCost', totalCost);
    this.spentTotal = totalCost/100;
  }
}
