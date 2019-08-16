
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function() {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

  mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhbnRpLWxlZSIsImEiOiJjanl4YzFsNjIwdmNkM2lycjBtMjE0YWU3In0.szoX1Xw81dq3xVxB7i9BGQ';
// This adds the map to your page
var map = new mapboxgl.Map({
  // container id specified in the HTML
  container: 'map',
  // style URL
  style: 'mapbox://styles/chanti-lee/cjyzpaftg1ff51dp84rnufcbv',
  // initial position in [lon, lat] format
  center: [-73.958, 40.761],
  // initial zoom
  zoom: 14
});

var stores = {
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
      },
      "id": "1f100a70149d0c764f967be5e47fefe0"
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
      },
      "id": "46f3514d0f7003eb890751305a9dca34"
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
      },
      "id": "4e935f0faedf5e4e75c078e2d063ec8c"
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
      },
      "id": "51742dd9877f9d26d73772904a77f56c"
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
      },
      "id": "52d5b2548c424429c3d3b2b69754ddf2"
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
      },
      "id": "7a938b74cdbb05ef37fa06d44c1192fa"
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
      },
      "id": "7e7ded96bd582d7a7876af007143616a"
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
      },
      "id": "87425884dfc233d779a7d29aac4edb8f"
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
      },
      "id": "b01497d91d3878aafddb0ed090931f4d"
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
      },
      "id": "b1fc9f90caf2eb8dd7b409a14f55b8fb"
    }
  ],
};

map.on('load', function(e) {
  // Add the data to your map as a layer
  map.addLayer({
    id: 'locations',
    type: 'symbol',
    // Add a GeoJSON source containing place coordinates and information.
    source: {
      type: 'geojson',
      data: stores
    },
    layout: {
      'icon-image': 'star-15',
      'icon-allow-overlap': true,
    }
  }),

  buildLocationList(stores);
});


function buildLocationList(data) {
  // Iterate through the list of stores
  for (i = 0; i < data.features.length; i++) {
    if ((data.features[i].properties.title).includes(document.getElementById("searchQuery").value)) {
      var currentFeature = data.features[i];
    // Shorten data.feature.properties to `prop`
    var prop = currentFeature.properties;
    // Select the listing container in the HTML and append a div
    // with the class 'item' for each store
    var listings = document.getElementById('listings');
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
    // Add an event listener for the links in the sidebar listing
    link.addEventListener('click', function(e) {
    // Update the currentFeature to the store associated with the clicked link
    var clickedListing = data.features[this.dataPosition];
    // 1. Fly to the point associated with the clicked link
    flyToStore(clickedListing);
    // 2. Close all other popups and display popup for clicked store
  createPopUp(clickedListing);
  // 3. Highlight listing in sidebar (and remove highlight for all other listings)
  var activeItem = document.getElementsByClassName('active');
  if (activeItem[0]) {
    activeItem[0].classList.remove('active');
  }
  this.parentNode.classList.add('active');
});

    // Create a new div with the class 'details' for each store
    // and fill it with the description
    // add further details
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.description;
  }
      }
    }
    
    

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

    for (var i = 0; i < stores.features.length; i++) {
      if (stores.features[i].properties.title === selectedFeature) {
        selectedFeatureIndex = i;
      }
    }
    // Select the correct list item using the found index and add the active class
    var listing = document.getElementById('listing-' + selectedFeatureIndex);
    listing.classList.add('active');
  }
});

//Sidebar open and close

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("map").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("map").style.marginLeft= "0";
}

