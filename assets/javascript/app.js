//Global Variables. Required for Map
var map;
var infowindow = new google.maps.InfoWindow();

var request;
var service;
var markers = [];
var heatmaps = [];
let chicago = { lat: 41.8817767, lng: -87.6393348 };






function initialize() {
    let center = new google.maps.LatLng(41.8817767, -87.6393348);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 5
    });

    //Creation of Custom Buttons Inside the Map
    let hideControlDiv = document.createElement('div');
    let showControlDiv = document.createElement('div');
    let removeControlDiv = document.createElement('div');
    let centerControl = new CenterControl(hideControlDiv, map);
    let showControl = new CenterControl2(showControlDiv, map);
    let removeControl = new CenterControl3(removeControlDiv, map);
    

    hideControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(hideControlDiv);

    showControlDiv.index = 2;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(showControlDiv);

    removeControlDiv.index = 3;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(removeControlDiv);

    

  

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'click', function (event) {
        map.setCenter(event.latLng)
        //clearResults(markers)
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();
        console.log(event.latLng)
        
    
        
    })

}
function clearMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }

}
function showMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
    for (i = 0; i < heatmaps.length; i++) {
        heatmaps[i].setMap(null)
    }
    heatmaps = [];
}

//functions for Map Button Controls
function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to Hide Markers';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Hide Markers';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        clearMarkers();
    });

}

function CenterControl2(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to Show Markers';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Show Markers';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        showMarkers();
    });

}

function CenterControl3(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to Remove Markers';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Remove All';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        deleteMarkers();
    });
}
function clearMarkers(){
    for(i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }

}
function showMarkers() {
    for(i = 0; i < markers.length; i++){
        markers[i].setMap(map);
    }
  }

  // Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
    for(i = 0; i < heatmaps.length; i++){
        heatmaps[i].setMap(null)
    }
    heatmaps = [];
    crimeID = [];
  }

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
        infowindow.setContent(place.name);
    })
    return marker;
}
google.maps.event.addDomListener(window, 'load', initialize)


//ZIP CODE BUTTON RECENTER AND AJAX CALL. Also Keyup for just hitting enter.

$("#submit").keyup(function (event) {
    if (event.keyCode === 13) {
        $(".zipbutton").click();
    }
});

$(".zipbutton").on("click", function zip(event) {
    var zip = $(".zipinput").val().trim()
    let zipURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&key=AIzaSyDgY9-PyCkSxe4lSoRx9gCp7S8bpeDyZsM"

    $.ajax({
        url: zipURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var lat = response.results[0].geometry.location.lat;
        var lng = response.results[0].geometry.location.lng;
        lat = lat.toFixed(4);
        lng = lng.toFixed(4);
        console.log(lat)
        console.log(lng)
        map.setCenter(new google.maps.LatLng(`${lat}`, `${lng}`));
    

    })
})




function textFormatter(desc) {

    return desc.replace(">", " (") + ")";

};



// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMKG_y1xnpu7qVcWJlIZm-BRHUMOak8Y0",
    authDomain: "vet-venter.firebaseapp.com",
    databaseURL: "https://vet-venter-default-rtdb.firebaseio.com/",
    projectId: "vet-venter",
    storageBucket: "vet-venter.appspot.com",
    messagingSenderId: "3803271847621",
};
firebase.initializeApp(config)

// Create a variable to reference the database.
var database = firebase.database();
firebase.analytics();

// Capture Button Click
$("#add-user").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

     // Capture user inputs and store them into variables
     var name = $("#name-input").val().trim();
     var email= $("#email-input").val().trim();
     var message = $("#message-input").val().trim();

      // Code for handling the push
    database.ref("/users").push({
        name: name,
        email: email,
        message: message
    });

});


 


//Link to grap values, add to the A tag and load into mailer.
$("#mailer").click(function () {
    let name = $("#name").val();
    let message = $("#message").val();
    let email = $("#inputEmail").val();
    $(this).attr("href", `mailto:joepathetic@yahoo.com?subject=${name}&body=${message}<br> From: ${email}`)
});
//navbar scroll
$(document).ready(function () {
    $(window).on('scroll', function () {
        if (Math.round($(window).scrollTop()) > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    })
})



