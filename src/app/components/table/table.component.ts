import {Component, EventEmitter, Input, Output} from '@angular/core';
// @ts-ignore
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
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input()
  set filterText(text: string) {
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
  mapsApiLoaded = false;

  loadGoogleMapsApi() {
    if (this.mapsApiLoaded) return;

    const mapsApiScript = document.createElement('script');
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCcKvtKpGcA9K21EskOrTgXWSGq5VFVef0&&libraries=places&callback=initMap&region=il&v=alpha';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPMMS5rRFw1lbQXDP7TXk-lRWOFWpH9QY&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCP9ddbLQHA_0fgCM0gwxfs7veczOEF5HI&libraries=places&callback=initMap&region=il&v=beta';
    mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXpanCe8ouRwjQHZjnmULaHNp_pnvLG90&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvi63ov7-DDDAPikhQnIKCJc0Kw9qNwXk&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCvdsssjrDocMOxF4Ua1KdDtqU6mxi7UQQ&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcqAkPYc4FjtgyjNSyEep8o7Z8N7uEOVo&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFCi2MzoYV1CCcnyuqEXODOuIcoCI6Rug&libraries=places&callback=initMap&region=il&v=beta&region=il';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB441MwqLRSXsrgHti3UTkvIhoRTitofAw&libraries=places&callback=initMap&region=il&v=alpha&region=il';

    mapsApiScript.async = true;
    // @ts-ignore
    window.initMap = () => {
      console.log('maps loaded');
      this.mapsApiLoaded = true;
    };

    document.head.appendChild(mapsApiScript);
  }

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

  async mapInitializedOld(map: google.maps.Map) {

    const request = {
      query: "Tel-Aviv museum of art",
      fields: ["name", "geometry.location"],
    };

    const service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(
        request,
        (
            results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            for (let i = 0; i < results.length; i++) {
              console.log(results[i].geometry!.location!.lat());
            }

            map.setCenter(results[0].geometry!.location!);
          }
        }
    );
  }

  async mapInitialized(map: google.maps.Map) {

    const {LatLng, LatLngBounds} = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

    const {Place} = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;

    const {AdvancedMarkerElement} = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const request = {
      query: 'פורת ספרים בעמ ',
      // fields: ['displayName', 'location', 'businessStatus'],
      fields: ['displayName', 'location'],
    };

    // const {places} = await Place.searchByText(request);
    console.log('get places')
    const { places} = await Place.findPlaceFromQuery(request);

    const bound = new LatLngBounds();

    if (places.length) {
      console.log(places);
      // Loop through and get all the results.
      places.forEach((place) => {

        // @ts-ignore
        console.log(place.photos?.at(0).getURI());

        const markerView = new AdvancedMarkerElement({
          map,
          position: place.location,
          title: place.displayName,
        });

        bound.extend(new LatLng(place.location!));
        console.log(place);
      });

      map.setCenter(bound.getCenter());

    } else console.log('No results');


  }
}
