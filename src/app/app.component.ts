import {Component, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ICalRecord} from "./interfaces/ICalRecord";
import {calculateTotalSpent} from './functions/calculate-total-spent';
import {groupArrayBy} from "./functions/group-array-by";
import {PromptUpdateService} from "./services/promt-update.service";
import {CalLoginComponent} from "./components/cal-login/cal-login.component";

type GraphData = { name: string, value: number };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  calRecords?: ICalRecord[];

  showGraph = false;
  graphData: GraphData[] = [];
  activeCategory?: { name: string; value: string }[];
  @ViewChild('filter') private filter?: ElementRef;
  private lazyLoginComponent?: CalLoginComponent;


  constructor(autoUpdateService: PromptUpdateService, private vcr: ViewContainerRef) {}

  onUpload(target: FileList | null) {
    // const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    // console.log(isSmallScreen)

    const file = target?.item(0);

    if (file?.name.endsWith('.xlsx') && file.size > 1000) {
      if (file.name.startsWith('transaction-details_export')) import('./functions/process-max-data') // Max
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
      else import('./functions/process-cal-data') // Cal
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
    }
    else if (file?.name.startsWith('Export_')) { // Isracard
      import('./functions/process-isracard-data')
          .then(m => m.processExcelData(file))
          .then(records => this.postProcessing(records));
    }
    else alert('The file format is not supported, please try another one.')
  }

  async onExampleLoad() {
    const [exampleArr, processJsonData] = await Promise.all([
      fetch('assets/trans-example-month.json').then(respFile => respFile.json()).then(data => data.result.transArr),
      import('./functions/process-cal-json-data').then(m => m.processCalJsonData)
    ]);

    this.postProcessing(processJsonData(exampleArr));
  }

  private postProcessing(records: ICalRecord[]) {
    this.calRecords = records;

    this.graphData = Object.entries(groupArrayBy(records, r => r.myCategory || 'other'))
        .map(([name, value]) => ({ name, value: calculateTotalSpent(value) }))
        .sort((a, b) => b.value - a.value);

  }

  onGraphCategorySelect({ name }: GraphData) {
    this.activeCategory = [{ name,  value: '#ff6200' }];
    this.filter!.nativeElement.value = name;
    // this.filterTransactions(name);
  }

  async calLogin() {
    if (!this.lazyLoginComponent) {
      const {CalLoginComponent} = await import('./components/cal-login/cal-login.component');
      this.lazyLoginComponent = this.vcr.createComponent(CalLoginComponent).instance;
      this.lazyLoginComponent.dataEvent.subscribe((data: ICalRecord[]) => this.postProcessing(data));
    }
    else this.lazyLoginComponent.showModal();
  }

  calLoadMore() {
    this.lazyLoginComponent?.download(-1);
  }
}
