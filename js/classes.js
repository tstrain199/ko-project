var initMap = function(){

  $('#map_area').height($('#body').height());
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.750568, lng: -73.993519},
    zoom: 12
  });

  var allMarkers = [];

  var infowindow = new google.maps.InfoWindow();

  resetMarkers = function() {
    deleteMarkers();
    for (var i = 0; i < viewModel.clubList().length; i++){
      location1 = viewModel.clubList()[i].location;
      name1 = viewModel.clubList()[i].name;
      (function(location1, name1){
        var marker = new google.maps.Marker({
        position: location1,
        title: name1,
        map: map,
        id: i
        });
        marker.addListener('click', function() {
            model.fetch4sVenueId(location1, name1, marker);
        });
        allMarkers.push(marker);
      })(location1, name1);
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
 createInfoWindow = function(data, marker) {
   // console.log(data);
   marker.setAnimation(google.maps.Animation.BOUNCE);
   window.setTimeout(function() {
     marker.setAnimation(null);
   }, 2000);
   imgUrlPre = data.response.venue.photos.groups[1].items[0].prefix;
   imgUrlPost = data.response.venue.photos.groups[1].items[0].suffix;
   image = imgUrlPre + '300x300' + imgUrlPost;
   phone = data.response.venue.contact.formattedPhone;
   infowindow.marker = marker;
   infowindow.setContent('<div>' + marker.title + '</div>' +
    '<div>' + phone + '</div>' +
    '<div style="width:200px; height:310px; "> <img src="' + image + '"></div>');
   //infowindow.setContent(content);
   infowindow.open(map, marker);
 };

 listInfoWindow = function(data){
   let marker1 = allMarkers.filter(marker => marker.title == data.name);
   console.log(marker1[0]);
   model.fetch4sVenueId(data.location, data.name, marker1[0]);
 }

resetMarkers();


};
