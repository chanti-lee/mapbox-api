
// attractions data 

var attractions = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "title": "American Museum of Natural History",
        "description": " From dinosaurs to outer space and everything in between, this huge museum showcases natural wonders."
      },
      "geometry": {
        "coordinates": [
          -73.974279,
          40.78109
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Metro Diner",
        "description": "American comfort-food standards delivered in a traditional art deco-styled diner setting."
      },
      "geometry": {
        "coordinates": [
          -73.97014,
          40.797443
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Whitney Museum of American Art",
        "description": "Museum exclusively featuring 20th-century & contemporary art by American artists, most still living."
      },
      "geometry": {
        "coordinates": [
          -74.008916,
          40.739643
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Elsewhere",
        "description": "Massive venue featuring several spaces (including a roof terrace) for live music & DJ nights."
      },
      "geometry": {
        "coordinates": [
          -73.923169,
          40.709394
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "The Loeb Boathouse Boat Rental",
        "description": "Boat Hire Service"
      },
      "geometry": {
        "coordinates": [
          -73.969112,
          40.774813
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Champion Pizza SoHo",
        "description": "Laid-back joint prepping creative thin-crust pizzas in narrow, wood-accented digs with a hip vibe."
      },
      "geometry": {
        "coordinates": [
          -73.997011,
          40.721518
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "MoMA PS1",
        "description": "Museum of Modern Art-run venue for experimental & contemporary art & events, set in an old school."
      },
      "geometry": {
        "coordinates": [
          -73.947458,
          40.745596
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "The Metropolitan Museum of Art",
        "description": " A grand setting for one of the world's greatest collections of art, from ancient to contemporary."
      },
      "geometry": {
        "coordinates": [
          -73.963231,
          40.779517
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Museum of Modern Art",
        "description": "Works from van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The Modern restaurant."
      },
      "geometry": {
        "coordinates": [
          -73.977463,
          40.761635
        ],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "The High Line",
        "description": "Popular park 30 feet above street level on an old rail line, with river & city views."
      },
      "geometry": {
        "coordinates": [
          -74.007897,
          40.7414
        ],
        "type": "Point"
      }
    }
  ],
};

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnRpLWxlZSIsImEiOiJjanl4YzFsNjIwdmNkM2lycjBtMjE0YWU3In0.szoX1Xw81dq3xVxB7i9BGQ';

// Add map to page
var map = new mapboxgl.Map({
  // container id specified in HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/mapbox/streets-v10',
  // initial position in [lon, lat] format
  center: [-73.958, 40.761],
  // initial zoom
  zoom: 13
});

//Adds data onto the map as points

map.on('load', function(e) {
  // Add the data to your map as a layer
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    // Add a GeoJSON source containing place coordinates and information.
    source: {
      type: 'geojson',
      data: attractions
    },
    layout: {
      'icon-image': 'star-15',
      'icon-allow-overlap': true,
    }
  }),
  buildLocationList(attractions);
  //Builds location list in the sidebar
});

function buildLocationList(data) {
  // Iterate through the list of attractions data
  for (i = 0; i < attractions.features.length; i++) {
      var currentFeature = data.features[i];
      // Shorten data.feature.properties to `prop`
      var prop = currentFeature.properties;
      // Select the listing container in the HTML and append a div
      // with the class 'item' for each store
      var listings = document.getElementById("listings");
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;
      // Create a new link with the class 'title' for each store
      // and fill it with the title of attraction
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.title;
    }
    };

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("map").style.marginLeft = "250px";
};

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("map").style.marginLeft= "0";
};
    
function checkInput() {
  var e = document.getElementById("listings");
  var child = e.lastElementChild;  
  while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
          }
  for (i = 0; i < attractions.features.length; i++) {
     if ((attractions.features[i].properties.title).includes(document.getElementById("searchQuery").value)) {
      var currentFeature = attractions.features[i];
      // Shorten data.feature.properties to `prop`
      var prop = currentFeature.properties;
      // Select the listing container in the HTML and append a div
      // with the class 'item' for each store
      var listings = document.getElementById("listings");
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';
      listing.id = 'listing-' + i;
      // Create a new link with the class 'title' for each store
      // and fill it with the title of attraction
      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';
      link.dataPosition = i;
      link.innerHTML = prop.title;
    }
    }
   };

function flyToStore(currentFeature) {
  map.flyTo({
    center: currentFeature.geometry.coordinates,
    zoom: 15
  });
}

function createPopUp(currentFeature) {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  // Check if there is already a popup on the map and if so, remove it
  if (popUps[0]) popUps[0].remove();

  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>' + currentFeature.properties.title + '</h3>' +
      '<h4>' + currentFeature.properties.description + '</h4>')
    .addTo(map);
}

// Add an event listener for when a user clicks on the map
map.on('click', function(e) {
  // Query all the rendered points in the view
  var features = map.queryRenderedFeatures(e.point, { layers: ['locations'] });
  if (features.length) {
    var clickedPoint = features[0];
    // 1. Fly to the point
    flyToStore(clickedPoint);
    // 2. Close all other popups and display popup for clicked store
    createPopUp(clickedPoint);
    // 3. Highlight listing in sidebar (and remove highlight for all other listings)
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
      activeItem[0].classList.remove('active');
    }
    // Find the index of the store.features that corresponds to the clickedPoint that fired the event listener
    var selectedFeature = clickedPoint.properties.title;

    for (var i = 0; i < attractions.features.length; i++) {
      if (attractions.features[i].properties.title === selectedFeature) {
        selectedFeatureIndex = i;
      }
    }
    // Select the correct list item using the found index and add the active class
    var listing = document.getElementById('listing-' + selectedFeatureIndex);
    listing.classList.add('active');
  }
});


