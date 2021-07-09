// declare variables
let zoomLevel = 5;
const mapCenter = [34.0709,-118.444];

// use the variables
const myMap = L.map('mapArea').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

L.control.scale({metric: true}).addTo(myMap);

// create a function to add markers
function addMarker(lat,lng,title,message,zoom){
    console.log(message)
    L.marker([lat,lng]).addTo(myMap).bindPopup(`<h2>${title}</h2>`)
    createButtons(lat,lng,title,zoom); 
    return message
}

// create a function to add buttons with a fly to command
function createButtons(lat,lng,title,zoom){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.style.color="black"
    newButton.style.backgroundColor="pink"
    

    // attach an event listner to the button with Leaflet's flyTo on our map called "myMap"
    newButton.addEventListener('mouseover', function(){
        newButton.style.color="white"
        newButton.style.backgroundColor="black"
        myMap.flyTo([lat,lng], zoom);    
    })
    
    document.body.appendChild(newButton);
    document.body.style.backgroundColor='lavender'; //this adds the button to our page.
}


// use our marker functions

addMarker(43.65,-79.383,'my favorite place','my favorite place!',10)
addMarker(13.08268,80.270721,'mom hometown','mom hometown',5)
addMarker(11.922,79.485,'dad hometown','dad hometown',7)
addMarker(20.6027,-105.23372,'best vacation memories','best vacation memories',6)
const buttonElement = document.getElementById('btn');

