// declare variables
let zoomLevel = 5;
const mapCenter = [34.0709,-118.444];

// use the variables
const myMap = L.map('mapArea').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(myMap).bindPopup(`<h2>${title}</h2>`)
    createButtons(lat,lng,title); // new line!!!
    return message
}

// create a function to add buttons with a fly to command
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 

    // attach an event listner to the button with Leaflet's flyTo on our map called "myMap"
    newButton.addEventListener('click', function(){
        myMap.flyTo([lat,lng]); 
    })
    document.body.appendChild(newButton); //this adds the button to our page.
}

// use our marker functions
addMarker(37,-122,'home','home land!')
addMarker(32,-118,'work','where i work land!')
addMarker(39,-119,'location 1','random location')
addMarker(36,-120,'location 2','another random location')

addMarker(43.65,-79.383,'my favorite place','my favorite place!')
addMarker(13.08268,80.270721,'mom hometown','my favorite place!')
addMarker(11.922,79.485,'dad hometown','my favorite place!')
addMarker(20.6027,-105.23372,'best vacation memories','my favorite place!')
const buttonElement = document.getElementById('btn');

