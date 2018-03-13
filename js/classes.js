var initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.750568, lng: -73.993519},
    zoom: 12
  });

  var allMarkers = [];

  var infowindow = new google.maps.InfoWindow();

  resetMarkers = function() {
    //console.log(viewModel.clubList());
    deleteMarkers();
    for (var i = 0; i < viewModel.clubList().length; i++){
      //console.log(image);
      var marker = new google.maps.Marker({
      position: viewModel.clubList()[i].location,
      title: viewModel.clubList()[i].name,
      map: map,
      id: i
    });
    marker.addListener('click', function() {
        createInfoWindow(this, infowindow);
    });
    allMarkers.push(marker);
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < allMarkers.length; i++) {
      bounds.extend(allMarkers[i].getPosition());
    };
    map.fitBounds(bounds);

  };

  hideMarker = function(id){
    console.log(allMarkers[id]);
    allMarkers[id].setVisible(false);
  };

  // Sets the map on all markers in the array.
  setMapOnAll = function(map) {
    for (var i = 0; i < allMarkers.length; i++) {
      allMarkers[i].setMap(map);
    }
  };

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers = function() {
     setMapOnAll(null);
   };

  // Deletes all markers in the array by removing references to them.
  deleteMarkers = function() {
   clearMarkers();
   allMarkers = [];
 };

//Taken from L17S7
 createInfoWindow = function(marker, infowindow) {
   infowindow.marker = marker;
   //console.log(marker);
   infowindow.setContent('<div>' + marker.title + '</div>' +
    '<div style="width:200px; height:150px; "><img src="' + image + '"></div>' +
    '<div style="width:200px; height:150px; ">' + phone + '</div>');
   //infowindow.setContent(content);
   infowindow.open(map, marker);
 };

  resetMarkers();


};
