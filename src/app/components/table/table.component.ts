import {Component, EventEmitter, Input, Output} from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MatTableModule } from "@angular/material/table";
import {CurrencyPipe, DatePipe, NgIf, TitleCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule, Sort} from "@angular/material/sort";
import {sortData} from "../../functions/sort-data";
import {filterData} from "../../functions/filter-data";
import {calculateTotalSpent} from "../../functions/calculate-total-spent";
import {ICalRecord} from "../../interfaces/ICalRecord";
import {CommentsIconPipe} from "../../pipes/comments-icon.pipe";
import {CategoryIconPipe} from "../../pipes/category-icon.pipe";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, DatePipe, MatIconModule, MatSortModule, NgIf, TitleCasePipe, CommentsIconPipe, CategoryIconPipe],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  set filterText(text: string) {
    if (text) this.filterTransactions(text, false);
  }
  @Output() filterTextChange = new EventEmitter<string>();

  @Input()
  set calRecords(records: ICalRecord[] | undefined) {
    if (records && records.length) {
      this.#calRecords = records;
      this.displayedRecords = records;
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
      this.dataLoaded = true;
    }
  }
  get calRecords(): ICalRecord[] {
    return this.#calRecords || [];
  }
  #calRecords?: ICalRecord[];

  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'translation', 'costNis', 'myCategory', 'count', 'comment'];
  expandedElement?: ICalRecord | null;
  spentTotal?: number;
  dataLoaded = false;

  private sort?: Sort;

  filterTransactions(searchStr: string, update = true) {
      this.displayedRecords = sortData(filterData(this.calRecords, searchStr), this.sort);
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
      if (update) this.filterTextChange.emit(searchStr);
  }

  sortTransactions(sort: Sort) {
    this.sort = sort;
    this.displayedRecords = sortData(this.displayedRecords, sort);
  }
}
