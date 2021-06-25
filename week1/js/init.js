let y = 2 + 2
const date = 23
console.log(y)
console.log("hello asian am 191a!");
// JavaScript const variable declaration
const map = L.map('map').setView([34.0709, -118.444], 20);

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.0709, -118.444]).addTo(map)
		.bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
		.openPopup();
let marker2 = L.marker([34.1, -118.444]).addTo(map)