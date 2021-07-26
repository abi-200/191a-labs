const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1DfHpyO4ViSfj9s4sO0-hivn0W9V6w5gz23zle9Oyjjo/ovc1kod/public/values?alt=json"

let Thunderforest_OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});

Thunderforest_OpenCycleMap.addTo(myMap);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                // console.log(data)
                formatData(data)
        }
)

let Englishfirstlang = L.featureGroup();
let Englishnotfirst = L.featureGroup();

let circleOptions = {
  radius: 4,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

function addMarker(data){
    if(data.isenglishyourfirstlanguage== "Yes"){
      circleOptions.fillColor = "purple"
        Englishfirstlang.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>English is a first language</h2>`))
        createButtons(data.lat,data.lng,data.location)
    }
    else{
        Englishnotfirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>English is not the first language</h2>`))
        createButtons(data.lat,data.lng,data.location)   
        
    }
    return data.timestamp
}
// let speakOtherLanguage = 0
//window.onload = function afterWebPageLoad() { 
    //document.body.append("Number of hidden records:"+speakOtherLanguage)


function createButtons(lat,lng,title){
const newButton = document.createElement("button"); // adds a new button
newButton.id = "button"+title; // gives the button a unique id
newButton.innerHTML = title; // gives the button a title
newButton.setAttribute("lat",lat); // sets the latitude 
newButton.setAttribute("lng",lng); // sets the longitude 
newButton.addEventListener('click', function(){
  myMap.flyTo([lat,lng]); //this is the flyTo from Leaflet
})
const spaceForButtons = document.getElementById('contents')
spaceForButtons.appendChild(newButton);//this adds the button to our page.
newButton.addEventListener('mouseover', function(){
  newButton.style.color="lavender"
  newButton.style.backgroundColor="black"
  myMap.flyTo([lat,lng]);    
})

}


function formatData(theData){
        const formattedData = []
        const rows = theData.feed.entry
        for(const row of rows) {
          const formattedRow = {}
          for(const key in row) {
            if(key.startsWith("gsx$")) {
                  formattedRow[key.replace("gsx$", "")] = row[key].$t
            }
          }
          formattedData.push(formattedRow)
        }
        console.log(formattedData)
        formattedData.forEach(addMarker)       
        Englishfirstlang.addTo(myMap) // add our layers after markers have been made
        Englishnotfirst.addTo(myMap) // add our layers after markers have been made  
} 
