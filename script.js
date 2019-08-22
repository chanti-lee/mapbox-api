
// array of attractions

var attractions = [
      {
        "title": "American Museum of Natural History",
        "description": " From dinosaurs to outer space and everything in between, this huge museum showcases natural wonders.",
        "coordinates": [
          -73.974279,
          40.78109
        ]
    },
    {
    "title": "Metro Diner",
    "description": "American comfort-food standards delivered in a traditional art deco-styled diner setting.",
    "coordinates": [
          -73.97014,
          40.797443
      ]
    },
      {
      "title": "Whitney Museum of American Art",
      "description": "Museum exclusively featuring 20th-century & contemporary art by American artists, most still living.",
        "coordinates": [
          -74.008916,
          40.739643
        ]
    },
    {
      "title": "Elsewhere",
      "description": "Massive venue featuring several spaces (including a roof terrace) for live music & DJ nights.",
        "coordinates": [
          -73.923169,
          40.709394
        ]
    },
    {
        "title": "The Loeb Boathouse Boat Rental",
        "description": "Boat Hire Service",
        "coordinates": [
          -73.969112,
          40.774813
        ]
    },
    {
      "title": "Champion Pizza SoHo",
      "description": "Laid-back joint prepping creative thin-crust pizzas in narrow, wood-accented digs with a hip vibe.",
      "coordinates": [
        -73.997011,
        40.721518
      ]
    },
    {
      "title": "MoMA PS1",
      "description": "Museum of Modern Art-run venue for experimental & contemporary art & events, set in an old school.",
        "coordinates": [
          -73.947458,
          40.745596
        ]
    },
    {
      "title": "The Metropolitan Museum of Art",
      "description": " A grand setting for one of the world's greatest collections of art, from ancient to contemporary.",
      "coordinates": [
          -73.963231,
          40.779517
        ]
    },
    {
      "title": "Museum of Modern Art",
      "description": "Works from van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The Modern restaurant.",
      "coordinates": [
        -73.977463,
        40.761635
        ]
    },
    {
        "title": "The High Line",
        "description": "Popular park 30 feet above street level on an old rail line, with river & city views.",
        "coordinates": [
          -74.007897,
          40.7414
        ]
      }
]

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

map.on('load', function(e) {
  addMarker();
  buildLocationList();
});

function addMarker() {
  for (i = 0; i < attractions.length; i++) {
      var m = document.createElement("div");
      m.className = "marker";
      m.id = attractions[i].title + " marker";
      var marker = new mapboxgl.Marker(m)
        .setLngLat(attractions[i].coordinates)
        .addTo(map);
  }
}

function checkMarkers() {
  for (i = 0; i < attractions.length; i++) {
    if (!(attractions[i].title).includes(document.getElementById("searchQuery").value)) {
      document.getElementById(attractions[i].title + " marker").className = "hide";
    }
    else {
      document.getElementById(attractions[i].title + " marker").className = "marker";
    }
  }
}

function buildLocationList() {
  // Iterate through the list of attractions data
  for (i = 0; i < attractions.length; i++) {
      var currentFeature = attractions[i];
      var listings = document.getElementById("listings");
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = "item";
      listing.id = attractions[i].title;
      // Create a new link with the class 'title' for each store
      // and fill it with the title of attraction
      var link = listing.appendChild(document.createElement('a'));
      link.href = "#";
      link.className = "title";
      link.dataPosition = i;
      link.innerHTML = currentFeature.title;
      var desc = link.appendChild(document.createElement('p'));
      desc.className = "description"
      desc.innerHTML = currentFeature.description;
    }
  }
    
function updateListings() {
  for (i = 0; i < attractions.length; i++) {
     if (!(attractions[i].title).includes(document.getElementById("searchQuery").value)) {
      document.getElementById(attractions[i].title).className = "hide";
    }
    else {

      document.getElementById(attractions[i].title).className = "item";
    }
  }
}


document.getElementById("searchQuery").addEventListener("input", function(){
  checkMarkers(),
  updateListings()
});

function openNav() {
  document.getElementById("mySidebar").style.width = "25%";
  document.getElementById("map").style.marginLeft = "25%";
};

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("map").style.marginLeft= "0";
};