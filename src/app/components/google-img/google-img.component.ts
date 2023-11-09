import {Component, inject, Input, OnInit} from '@angular/core';
import {GoogleMapService} from "../google-map/google-map.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-google-img',
  standalone: true,
  templateUrl: './google-img.component.html',
  imports: [ NgIf ],
  styleUrl: './google-img.component.scss'
})
export class GoogleImgComponent implements OnInit{
  @Input({ required: true }) searchTerm!: string;
  photoUrl?: string;
  placeName: string | null | undefined;
  googleService = inject(GoogleMapService);

  async ngOnInit() {
    if (!this.searchTerm.trim()) return;
    const myPlace = await this.googleService.findPlace(this.searchTerm);

    console.log('Found a place:', myPlace);
    this.placeName = myPlace?.displayName;

    if (myPlace?.photos) console.log('Photos', myPlace.photos);
    const firstPhoto = myPlace?.photos?.at(0);
    this.photoUrl = firstPhoto?.getURI({ maxWidth:800 }) ;
    console.log('place photoUrl', this.photoUrl)
  }

}
