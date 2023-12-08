import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {ICalRecord} from "../../interfaces/ICalRecord";
import {filterData} from "../../functions/filter-data";
import {calculateTotalSpent} from "../../functions/calculate-total-spent";
import {CategoryIconPipe} from "../../pipes/category-icon.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";

@Component({
  selector: 'app-records-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CategoryIconPipe, MatIconModule, MatRippleModule],
  templateUrl: './records-list.component.html',
  styleUrl: './records-list.component.scss'
})
export class RecordsListComponent {
  #allRecords: ICalRecord[] = [];
  displayedRecords: ICalRecord[] = [];
  spentTotal?: number;

  @Input({ required: true }) set records(records: ICalRecord[] | undefined) {
    if (records && records.length) {
      this.#allRecords = records;
      this.displayedRecords = records;
      this.spentTotal = calculateTotalSpent(this.displayedRecords);
    }
  }

  @Input() set filterText(searchStr: string) {
    this.displayedRecords = filterData(this.#allRecords, searchStr);
    this.spentTotal = calculateTotalSpent(this.displayedRecords);
  }

  showOnMap(address: string) {
    window.open('https://www.google.com/maps/search/?api=1&query=' + address, '_self');
  }

  searchInGoogle(description: string) {
    window.open('https://www.google.com/search?q=' + description, '_self');
  }

  suggestTranslation(record: ICalRecord) {
    prompt('Type your translation:')
  }
}
