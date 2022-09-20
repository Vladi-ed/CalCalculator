import {Component} from '@angular/core';
import {parse as csvParseToObject} from 'csv-parse/browser/esm/sync';
import {comments, vocabulary} from "./vocabulary";
import {ICalRecord} from "./ICalRecord";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calCalculator';

  calRecords?: ICalRecord[];
  filteredRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'count', 'translation', 'cost',	'costNis', 'comment'];
  spentTotal?: number;

  onUpload(target: any) {
    const file = (target as HTMLInputElement).files?.item(0);
    file?.text().then(fileContent => this.processDataV2(fileContent));
  }

  processDataV2(content: string) {
    const records: ICalRecord[] = csvParseToObject(content, {
      columns: ['date',	'description', 'cost',	'costNis', 'comment'],
      fromLine: 4,
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
      line.translation = vocabulary.find(item => line.description.includes(item.keyword))?.translation || '';
    })

    console.log(records);

    this.calRecords = records;
    this.filteredRecords = records;

    this.calculateTotalSpent();
  }

  filterTransactions(s: string) {
    if (this.calRecords) {
      if (s) {
        const sFilter = s.toUpperCase();
        this.filteredRecords = this.calRecords?.filter(col => col.translation?.toUpperCase().includes(sFilter) || col.description.includes(sFilter));
      }
      else this.filteredRecords = this.calRecords;

      this.calculateTotalSpent();
    }
  }

  calculateTotalSpent() {
    const totalCost = this.filteredRecords
      .map(t => 100 * Number(t.costNis.replace(/[^0-9.-]+/g,'')))
      .reduce((acc, value) => acc + value, 0);

    console.log('totalCost', totalCost);
    this.spentTotal = totalCost/100;
  }

  sortData(sort: Sort) {
    const data = this.filteredRecords?.slice();
    if (!sort.active || sort.direction === '') {
      this.filteredRecords = data;
      return;
      // TODO fix sorting when not sorted
    }

    function compare(a: any, b: any, isAsc: boolean) {
      if (!a) a = '';
      if (!b) b = '';
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.filteredRecords = data?.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const columnToSort = sort.active as keyof ICalRecord;

      if (columnToSort === 'costNis') {
        const aNum = Number(a.costNis.replace(/[^0-9.-]+/g, ''));
        const bNum = Number(b.costNis.replace(/[^0-9.-]+/g, ''));
        return compare(aNum, bNum, isAsc);
      }
      else return compare(a[columnToSort], b[columnToSort], isAsc);

    });
  }


}
