const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

const url = "https://spreadsheets.google.com/feeds/list/1DfHpyO4ViSfj9s4sO0-hivn0W9V6w5gz23zle9Oyjjo/ovc1kod/public/values?alt=json"

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});
Esri_WorldGrayCanvas.addTo(myMap);


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

let Englishprof = L.featureGroup();
let Englishprof1 = L.featureGroup();


let circleOptions = {
  radius: 10,
  fillColor: "purple",
  color: "pink",
  weight: 2,
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
      circleOptions.fillColor = "red"
        Englishnotfirst.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>English is not the first language</h2>`))
        createButtons(data.lat,data.lng,data.location)    
    }
    
    return data.timestamp
    

}




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
  newButton.style.backgroundColor="purple"
  newButton.style.fontFamily="monospace"
  newButton.style.fontSize = 40%
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
        let layers = {
          "English first language": Englishfirstlang,
          "English not first language": Englishnotfirst,
          "Fluent in English": Englishprof,
          "Not fluent in English": Englishprof1
          
        }
        L.control.layers(null,layers).addTo(myMap)
        
        let allLayers = L.featureGroup([Englishfirstlang,Englishnotfirst,Englishprof,Englishprof1]);
        myMap.fitBounds(allLayers.getBounds());     
} 