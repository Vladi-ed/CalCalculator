import {Component, inject, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";
import {GoogleMapService} from "./google-map.service";

@Component({
    selector: 'app-google-map',
    standalone: true,
    imports: [CommonModule, GoogleMapsModule, NgOptimizedImage],
    templateUrl: './google-map.component.html',
    styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent {
    @Input() searchTerm!: string;
    @Input() showMap!: boolean;
    mapOptions: google.maps.MapOptions;
    mapsApiLoaded?: boolean;
    googleService = inject(GoogleMapService);

    constructor() {
        // initial values
        this.mapOptions = {
            center: { lat: 32.0, lng: 34.7 },
            mapTypeId: 'terrain',
            zoom: 18,
            mapId: 'e2f9ddc0facd5a80'
        }
        // TODO: check if this line is required
        google.maps.importLibrary("maps").then(() => this.mapsApiLoaded = true);
    }

    async afterMapInit(map: google.maps.Map) {
        const myPlace = await this.googleService.findPlace(this.searchTerm, ['displayName', 'location']);

        console.log(myPlace);
        if (!myPlace?.location) return;

        // set map center
        map.setCenter(myPlace.location);

        // add marker on the map
        new google.maps.Marker({
            map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: myPlace.location,
            title: myPlace.displayName
        });
    }
}
