function loadGoogleMapsApi() {
    const mapsApiScript = document.createElement('script');

    mapsApiScript.async = true;
    // @ts-ignore
    window.initMap = () => {
        console.log('maps loaded');
        // this.mapsApiLoaded = true;
    };

    document.head.appendChild(mapsApiScript);
}

async function mapInitializedOld(map: google.maps.Map) {

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

async function mapInitialized(map: google.maps.Map) {

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

            new AdvancedMarkerElement({
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