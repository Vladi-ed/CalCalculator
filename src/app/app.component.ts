import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {IRecord} from "./interfaces/IRecord";
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {groupArrayBy} from "./functions/group-array-by";
import {AppUpdateService} from "./services/app-update.service";
import {CalLoginComponent} from "./components/cal-login/cal-login.component";
import {copyTable4} from "./functions/copy-table";

type GraphData = { name: string, value: number };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  calRecords?: IRecord[];

  showGraph = false;
  graphData: GraphData[] = [];
  activeCategory?: { name: string; value: string }[];
  isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;

  @ViewChild('filter') private filter?: ElementRef;
  protected lazyLoginComponent?: CalLoginComponent;

  constructor(autoUpdateService: AppUpdateService, private vcr: ViewContainerRef) { }

  onUpload(target: FileList | null) {
    const file = target?.item(0);

    if (file?.name.endsWith('.xlsx') && file.size > 1000) {
      if (file.name.startsWith('transaction-details_export')) import('./functions/process-max-data') // Max
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
      else import('./functions/process-cal-data') // Cal
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
    } else if (file?.name.startsWith('Export_')) { // Isracard
      import('./functions/process-isracard-data')
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
    } else alert('The file format is not supported, please try another one.')
  }

  async onExampleLoad() {
    const [exampleArr, processJsonData] = await Promise.all([
      fetch('assets/cal-trans-example-month.json').then(respFile => respFile.json()).then(data => data.result.transArr),
      import('./functions/process-cal-json-data').then(m => m.processCalJsonData)
    ]);

    this.postProcessing(processJsonData(exampleArr));
  }

  private postProcessing(records: IRecord[]) {
    if (this.calRecords) this.calRecords = [...this.calRecords, ...records];
    else this.calRecords = records;

    this.graphData = Object.entries(groupArrayBy(this.calRecords, r => r.myCategory || 'other'))
        .map(([name, value]) => ({name, value: calculateTotalSpent(value)}))
        .sort((a, b) => b.value - a.value);

    if (this.isMobile) this.showGraph = true;
  }

  onGraphCategorySelect({name}: GraphData) {
    this.activeCategory = [{name, value: '#ff6200'}];
    this.filter!.nativeElement.value = name;
    // this.filterTransactions(name);
  }

  async calLogin() {
    if (!this.lazyLoginComponent) {
      const {CalLoginComponent} = await import('./components/cal-login/cal-login.component');
      this.lazyLoginComponent = this.vcr.createComponent(CalLoginComponent).instance;
      this.lazyLoginComponent.dataEvent.subscribe((data: IRecord[]) => this.postProcessing(data));
    } else this.lazyLoginComponent.showModal();
  }

  calLoadMore() {
    this.lazyLoginComponent?.download(-1);
  }

  get dateRange(): string {
    if (this.calRecords?.at(0)) {
      const firstValue = new Date(this.calRecords.at(0)!.date);
      const lastValue = new Date(this.calRecords.at(-1)!.date);
      const sameYear = firstValue.getFullYear() == lastValue.getFullYear();

      if (firstValue < lastValue) {
        return firstValue.toLocaleDateString('en-IL', {day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric'})
             + ' – '
             + lastValue.toLocaleDateString('en-IL', {day: 'numeric', month: 'short', year: "numeric"});
      }
      else {
        return lastValue.toLocaleDateString('en-IL', {day: 'numeric', month: 'short', year: sameYear ? undefined : 'numeric'})
            + ' – '
            + firstValue.toLocaleDateString('en-IL', {day: 'numeric', month: 'short', year: "numeric"});
      }
    }

    return '';
  }

  protected readonly copyTable = copyTable4;

  async testTranslate() {
    const resp = await fetch('/ai-translate.api' + '?text=' + 'דליקטסן');
    const data = await resp.text();
    console.log('Got data from ai-translate.api', data);
  }
}
