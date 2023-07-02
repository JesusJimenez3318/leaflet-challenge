// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function(data) {
    // createFeatures(data.features);

console.log(data)
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(myMap);
L.geoJSON(data,{onEachFeature:onEachFeature, pointToLayer:pointToLayer}).addTo(myMap);

    function onEachFeature(feature, layer){
        let mag = feature.properties.mag
        let depth = feature.geometry.coordinates[2]
        let place = feature.properties.place

        layer.bindPopup(`<h3>Location: ${place}</h3><hr><p>
        Magnitude:${mag}</p><hr><p>
        Depth: ${depth}</p><hr2><p>`);
    }

function pointToLayer(feature, latlng){
    let options ={
        radius: feature.properties.mag*5,
        color: "gray",
        fillColor: getColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.50     
    }
return L.circleMarker(latlng, options);
    };
function getColor(d){
    return d > 90 ? '#ff0000' :
     d > 70 ? '#FF5C14' :
     d > 50 ? '#FF8A1B' :
     d > 30 ? '#FCD514' :
     d > 10 ? '#98DA00' :
     d > -10 ? '#1FD224' : '#FFEDA0'
}

const legend = L.control({position: 'bottomright'});

	legend.onAdd = function (myMap) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = ['-10-10','10-30','30-50','50-70','70-90','90+'];
        const colors = ["background:#1FD224",
                        "background:#98DA00",
                        "background:#FCD514",
                        "background:#FF8A1B", 
                        "background:#FF5C14",
                        "background:#ff0000"]

		for (let i = 0; i < grades.length; i++) {
    
            div.innerHTML += `<i style=${colors[i]}></i> ${grades[i]}<br>`
		}		
		return div;
	};
legend.addTo(myMap);
})
