import {Component, ComponentRef, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ICalRecord} from "./interfaces/ICalRecord";
import {Sort} from '@angular/material/sort';
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {sortData} from './functions/sort-data';
import {filterData} from './functions/filter-data';
import {groupArrayBy} from "./functions/group-array-by";
import {PromptUpdateService} from "./services/promt-update.service";
type GraphData = { name: string, value: number };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calRecords?: ICalRecord[];
  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'translation', 'costNis', 'myCategory', 'count', 'comment'];
  spentTotal?: number;

  showGraph = false;
  graphData: GraphData[] = [];
  activeCategory?: { name: string; value: string }[];
  private sort?: Sort;
  @ViewChild('filter') private filter?: ElementRef;
  bgColor = 'white'; // TODO: Do Material theming

  private loginComponentRef?: ComponentRef<any>;

  constructor(updateService: PromptUpdateService, private vcr: ViewContainerRef) {}

  onUpload(target: FileList | null) {
    const file = target?.item(0);

    if (file?.name.endsWith('.xlsx') && file.size > 1000) {
      import('./functions/process-excel-data')
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
    }
    else alert('The file seems to be broken, please try another one')
  }

  async onLoadPreset() {
    const [exampleArr, processJsonData] = await Promise.all([
      fetch('assets/trans-example-month.json').then(respFile => respFile.json()).then(data => data.result.transArr),
      import('./functions/process-json-data').then(m => m.processJsonData)
    ]);

    this.postProcessing(processJsonData(exampleArr));
  }

  private postProcessing(records: ICalRecord[]) {
    this.calRecords = records;
    this.displayedRecords = records;
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
    this.graphData = Object.entries(groupArrayBy(records, r => r.myCategory || 'other'))
        .map(([name, value]) => ({ name, value: calculateTotalSpent(value) }))
        .sort((a, b) => b.value - a.value);

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

  async calLogin() {
    if (!this.loginComponentRef) {
      const {CalLoginComponent} = await import('./components/cal-login/cal-login.component');
      this.loginComponentRef = this.vcr.createComponent(CalLoginComponent);
      this.loginComponentRef.instance.sendDataEvent
          .subscribe((data: ICalRecord[]) => {
            console.log('Got some data from CalLoginComponent')
            this.postProcessing(data);
          });
    }
    else this.loginComponentRef.instance.showModal();
  }
}
