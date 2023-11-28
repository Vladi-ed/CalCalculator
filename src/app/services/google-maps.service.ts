import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleMapsService {
  constructor() {
    // @ts-ignore Loading The Google Maps JavaScript API
    (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
      key: 'AIzaSyDXpanCe8ouRwjQHZjnmULaHNp_pnvLG90',
      v: 'beta',
      region: 'il',
    });
  }

  async findPlace(name: string, dataFields: string[]) {
    const request: google.maps.places.FindPlaceFromQueryRequest = {
      query: name,
      fields: dataFields
    };

    const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    return Place.findPlaceFromQuery(request).then(obj => obj.places[0]);
  }
}
