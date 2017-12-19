var model = {

  "usualClubs" : [
    {name: 'The Village Vanguard', location: {lat: 40.7360303, lng: -74.00168649999999}},
    {name: 'Smalls', location: {lat: 40.734295, lng: -74.002692}},
    {name: 'Mezzrow', location: {lat: 40.7346000, lng: -74.0019240}},
    {name: 'Birdland', location: {lat: 40.7590482, lng: -73.9896335}},
    {name: 'The Jazz Standard', location: {lat: 40.7422962, lng: -73.983777}},
    {name: 'Dizzy\'s Coca-Cola Club', location: {lat: 40.7685594, lng: -73.9830762}},
    {name: 'Smoke', location: {lat: 40.8011258, lng: -73.9681923}},
    {name: 'The Blue Note', location: {lat: 40.7308943, lng: -74.00070300000002}}
  ],

  Club:  function(name, location){
      this.name = name;
      this.location = location;
  },

  "tmClubs" : [],
  "sortList" : [],

  fetchTmData : function() {
    $.ajax({
      type: "GET",
      url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=Jazz&dmaId=345&apikey=pRZh7znoV9HKvcHqyjPS98Ftw4dYXF0J",
      async: true,
      dataType: "json",
      success: function(json){
        var robj = json._embedded.events;
        robj.forEach(function(event) {
          var r_name = event._embedded.venues[0].name
          var r_location_lat = event._embedded.venues[0].location.latitude;
          var r_location_lng = event._embedded.venues[0].location.longitude;
          var venue = {name: r_name, location: {lat: parseFloat(r_location_lat), lng: parseFloat(r_location_lng)}};
          results = $.inArray(r_name, model.sortList);
          if (-1 === results){
            model.tmClubs.push(venue);
            model.sortList.push(r_name);
          }
        });
      },
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
};

model.fetchTmData();
console.log(model.tmClubs);
