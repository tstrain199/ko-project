var initMap = function(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.750568, lng: -73.993519},
    zoom: 12
  });

  var allMarkers = [];

  resetMarkers = function() {
    deleteMarkers();
    for (var i = 0; i < viewModel.clubList().length; i++){
    var marker = new google.maps.Marker({
      position: viewModel.clubList()[i].location,
      title: viewModel.clubList()[i].name,
      map: map,
      id: i
    });
    allMarkers.push(marker);
    }
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

  resetMarkers();


};
