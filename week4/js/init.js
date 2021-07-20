const myMap = L.map('mapArea').setView([34.0709, -118.444], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function addMarker(data){
        L.marker([data.lat,data.lng]).addTo(myMap).bindPopup(`<h3>Ethnicity: ${data.whatisyourethnicity}</h3>`+ `<h3>Location: ${data.location}</h3>`+`<p>English Proficiency Level:${data.whatisyourenglishproficiencylevel}</p>`+`<p>First Language(if not English):${data.whatisyourfirstlanguage}</p>`)
        return data.whatisyourethnicity
;}


let url = "https://spreadsheets.google.com/feeds/list/1DfHpyO4ViSfj9s4sO0-hivn0W9V6w5gz23zle9Oyjjo/ovc1kod/public/values?alt=json"

fetch(url)
	.then(response => {
		return response.json();
		})
    .then(data =>{
                formatData(data)
        }
)

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
       
}

