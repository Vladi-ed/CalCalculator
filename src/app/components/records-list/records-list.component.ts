import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from "@angular/material/expansion";
import {IRecord} from "../../interfaces/IRecord";
import {filterData} from "../../functions/filter-data";
import {calculateTotalSpent} from "../../functions/calculate-total-spent";
import {CategoryIconPipe} from "../../pipes/category-icon.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatRippleModule} from "@angular/material/core";
import { suggestTranslation } from '../../functions/suggest-translation';
import {PriceFormatPipe} from "../../pipes/price-format.pipe";
import {RemoveZeroTimePipe} from "../../pipes/remove-zero-time.pipe";

@Component({
  selector: 'app-records-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CategoryIconPipe, MatIconModule, MatRippleModule, PriceFormatPipe, RemoveZeroTimePipe],
  templateUrl: './records-list.component.html',
  styleUrl: './records-list.component.scss'
})
export class RecordsListComponent {
  #allRecords: IRecord[] = [];
  displayedRecords: IRecord[] = [];
  spentTotal?: number;
  protected readonly suggestTranslation = suggestTranslation;

  @Input({ required: true }) set records(records: IRecord[] | undefined) {
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
}
