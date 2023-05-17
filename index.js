
const latLngBounds = L.latLngBounds([[25.06, -122.86], [49.52, -68.68]]);	

const forestIcon = L.icon({iconUrl: './pin.png', iconSize: [23, 30], iconAnchor: [10, 20], popupAnchor: [0, -21]	});
		       
const map = L.map('map', {
    minZoom: 1,
    maxZoom: 18
}); 

const voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

map.fitBounds(latLngBounds);

let markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 70,
    spiderfyDistanceMultiplier: 0,
    disableClusteringAtZoom: 14
});

const points = new L.GeoJSON(cities, {
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 8,
            fillColor: "#006f91",
            color: "#00485e",
            weight: 1,
            opacity: 0.75,
            fillOpacity: 0.75
        });	
    },
    onEachFeature: function (feature, layer) {
        const desc = '<div class="popupBox" style="background: rgb(255, 255, 255);">\
        <div class="titleBox"><span class="titleBoxText">'  + feature.properties.title + ' </span></div></div>';

        layer.bindPopup(desc, {offset: [0, -5]});
    }
});

markers.addLayer(points);
map.addLayer(markers);