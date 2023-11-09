function loadGoogleMapsApi() {
    const mapsApiScript = document.createElement('script');

    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCcKvtKpGcA9K21EskOrTgXWSGq5VFVef0&&libraries=places&callback=initMap&region=il&v=alpha';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDPMMS5rRFw1lbQXDP7TXk-lRWOFWpH9QY&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCP9ddbLQHA_0fgCM0gwxfs7veczOEF5HI&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXpanCe8ouRwjQHZjnmULaHNp_pnvLG90&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvi63ov7-DDDAPikhQnIKCJc0Kw9qNwXk&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCvdsssjrDocMOxF4Ua1KdDtqU6mxi7UQQ&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcqAkPYc4FjtgyjNSyEep8o7Z8N7uEOVo&libraries=places&callback=initMap&region=il&v=beta';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAFCi2MzoYV1CCcnyuqEXODOuIcoCI6Rug&libraries=places&callback=initMap&region=il&v=beta&region=il';
    // mapsApiScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB441MwqLRSXsrgHti3UTkvIhoRTitofAw&libraries=places&callback=initMap&region=il&v=alpha&region=il';

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