let y = 2 + 2
const date = 23
console.log(y)
console.log("hello asian am 191a!");
// JavaScript const variable declaration
const map = L.map('map').setView([34.0709, -118.444], 1);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.109531, -117.563256]).addTo(map)
		.bindPopup('This is the city that I moved to when I was 13 years old, and it is currently where my parents and most of my best friends live. ')
		.openPopup();
let marker2 = L.marker([43.802819, -79.609658]).addTo(map)
		.bindPopup('This is the city where I was raised and spent all of my childhood. Most of my family and memories growing up from when I was born to when I was 13 are here. ')
		.openPopup();
let marker3 = L.marker([13.108905, 80.270256]).addTo(map)
		.bindPopup('This is the city that both of my parents/sides of the family are from, and although I have only visited once I want to go back someday ')
		.openPopup();
let marker4 = L.marker([40.726446, -74.012122]).addTo(map)
		.bindPopup('I have always wanted to visit NYC for many reasons, such as I have a dream of watching an off-broadway production before it gets big, and also over the past couple of years some cousins and friends have moved in nearing cities so I can visit them ')
		.openPopup();
fetch("map.geojson")
	.then(response => {
		return response.json();
		})
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
            // the leaflet method for adding a geojson
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {color: feature.properties.color});
                }
            }).bindPopup(function (layer) {
                return layer.feature.properties.place;
            }).addTo(map);
        });

