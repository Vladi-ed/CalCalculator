import {Component, Input} from '@angular/core';
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
    photoUrl?: string;
    mapsApiLoaded?: boolean;
    constructor(protected mapService: GoogleMapService) {
        this.mapOptions = {
            center: { lat: 32.0, lng: 34.7 },
            mapTypeId: 'terrain',
            zoom: 18,
            mapId: 'e2f9ddc0facd5a80'
        }
        google.maps.importLibrary("maps").then(() => this.mapsApiLoaded = true);
        
    }

    async afterMapInit(map: google.maps.Map) {
        const request: google.maps.places.FindPlaceFromQueryRequest = {
            query: this.searchTerm,
            // fields: ['displayName', 'location', 'businessStatus'],
            fields: ['displayName', 'location', 'photos']
        };

        const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
        const { places} = await Place.findPlaceFromQuery(request);
        const myPlace = places.at(0);

        console.log(myPlace);

        if (!myPlace?.location) return;

        map.setCenter(myPlace.location);

        const marker = new google.maps.Marker({
            map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: myPlace.location,
        });

        this.photoUrl = myPlace.photos?.at(0)?.getURI();
        if (myPlace.photos) console.log('Photos', myPlace.photos);

    }
}
