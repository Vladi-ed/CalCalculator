import {Component, EventEmitter, Input, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableModule} from "@angular/material/table";
import {AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, NgIf, TitleCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatSortModule, Sort} from "@angular/material/sort";
import {sortData} from "../../functions/sort-data";
import {filterData} from "../../functions/filter-data";
import {calculateTotalSpent} from "../../functions/calculate-total-spent";
import {ICalRecord} from "../../interfaces/ICalRecord";
import {CommentsIconPipe} from "../../pipes/comments-icon.pipe";
import {CategoryIconPipe} from "../../pipes/category-icon.pipe";
import {GoogleMapsModule} from "@angular/google-maps";
import {GoogleMapComponent} from "../google-map/google-map.component";
import {GoogleImgComponent} from "../google-img/google-img.component";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, DatePipe, MatIconModule, MatSortModule, NgIf, TitleCasePipe, CommentsIconPipe, CategoryIconPipe, JsonPipe, AsyncPipe, GoogleMapsModule, GoogleMapComponent, GoogleImgComponent],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() set filterText(text: string) {
    this.filterTransactions(text, false);
  }
  @Output() filterTextChange = new EventEmitter<string>();

  @Input({ required: true })
  set records(records: ICalRecord[] | undefined) {
    if (records && records.length) {
      this.#allRecords = records;
      this.displayedRecords = records;
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
      // this.sortTransactions({ active: 'date', direction: 'desc'}); // sort by date is destructive, better sort by id
      this.dataLoaded = true;
    }
  }

  #allRecords: ICalRecord[] = [];
  #currentSort?: Sort;

  displayedRecords: ICalRecord[] = [];
  displayedColumns: (keyof ICalRecord)[] = ['date',	'description', 'translation', 'costNis', 'myCategory', 'count', 'comment'];
  selectedRecord?: ICalRecord | null;
  spentTotal?: number;
  dataLoaded = false;
  filterTransactions(searchStr: string, emitEvent = true) {
      this.displayedRecords = sortData(filterData(this.#allRecords, searchStr), this.#currentSort);
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
      if (emitEvent) this.filterTextChange.emit(searchStr);
  }
  sortTransactions(sort: Sort) {
    // console.log(sort)
    this.#currentSort = sort;
    this.displayedRecords = sortData(this.displayedRecords, sort);
  }
}
