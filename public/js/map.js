mapboxgl.accessToken = mapToken;

const defaultCoordinates = [-97.0000, 38.0000]; // India

let coordinates = defaultCoordinates;

// Use listing coordinates if they exist
if (
    listing.geometry &&
    listing.geometry.coordinates &&
    listing.geometry.coordinates.length === 2
) {
    coordinates = listing.geometry.coordinates;
}

const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates,
    zoom: 9
});

const marker1 = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4>${listing.location}</h4>
                 <p>Exact location provided after booking!</p>`
            )
    )
    .addTo(map);