// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Day Navigation": light,
    "Night Navigation": dark
};

// Create the map object with a center and a zoom level
let map = L.map('mapid', {
    center: [44.0,-80.0],
    zoom: 2,
    layers: [dark]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let torontoData = "https://raw.githubusercontent.com/tannazmo/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a atyle for the lines
let myStyle = {
    color: "#ffffa1",
    weight: 2
}
//Grabbing our GeoJSON data:
d3.json(torontoData).then(function(data){
    console.log(data),
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function(feature,layer){
            console.log(layer);
            layer.bindPopup("<h2>Airline: " + feature.properties.airline + "</h2><hr><h2>Destination: " + feature.properties.dst + "</h2>" )
        }

    })
    .addTo(map);
});
