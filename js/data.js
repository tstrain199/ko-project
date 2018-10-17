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
        //console.log(robj);
        robj.forEach(function(event) {
          var r_name = event._embedded.venues[0].name
          var r_location_lat = event._embedded.venues[0].location.latitude;
          var r_location_lng = event._embedded.venues[0].location.longitude;
          var venue = {name: r_name,
            location: {lat: parseFloat(r_location_lat), lng: parseFloat(r_location_lng)},
          };
          results = $.inArray(r_name, model.sortList);
          if (-1 === results){
            model.tmClubs.push(venue);
            model.sortList.push(r_name);
          }
        });
        //model.updateList(model.tmClubs);
      },
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },


// https://stackoverflow.com/questions/8427012/foursquare-javascript-api
//https://stackoverflow.com/questions/35026964/what-is-wrong-with-my-foursquare-api-call
  fetch4sVenueId : function(location1, name1, marker) {
      name = name1;
      // console.log(location1);
      lat = location1.lat;
      lng = location1.lng;
      $.ajax({
        url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json',
        data:
          'limit-1' +
          '&client_id=XN55DS4DVJZQLSGGSZ3ZWM5HJYLDXMOD21LYJFU2R1DZWQWE' +
          '&client_secret=MNMNXPO1W2BF5LNSWYIUJ0YAHXVSRHDI5SUSWHO0IAKDGXZY' +
          '&ll=' + lat + ',' + lng +
          '&query=' + name +
          '&v=20170801' ,
        async: true,
        success: function (data) {
          var id = data.response.venues[0].id;
          model.fetch4sVenueDetails(id, marker);
          //console.log(id);
        },
        error: function(xhr, status, err) {
          console.log(err);
        }

      });
    },

  fetch4sVenueDetails : function(id, marker) {
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/' + id,
      dataType: 'json',
      data:
        'v=20170801' +
        '&client_id=XN55DS4DVJZQLSGGSZ3ZWM5HJYLDXMOD21LYJFU2R1DZWQWE' +
        '&client_secret=MNMNXPO1W2BF5LNSWYIUJ0YAHXVSRHDI5SUSWHO0IAKDGXZY' ,
      async: true,
      success: function(data) {
       //  console.log(data);
      //  model.appendDetails(list, index, data);
         createInfoWindow(data, marker)
      },
      error: function(xhr, status, err) {
        console.log(err);
      }

    });
  },

  appendDetails : function(list, index, data) {
    //console.log(data.response.venue.photos.groups[0].items[1].prefix);
    imgUrlPre = data.response.venue.photos.groups[0].items[0].prefix;
    imgUrlPost = data.response.venue.photos.groups[0].items[0].suffix;
    phone = data.response.venue.contact.formattedPhone;
    list[index].phone = phone;
    list[index].image = imgUrlPre + '300x300' + imgUrlPost;
  },

  updateList : function(list) {
    for (i = 0; i < list.length; i++) {
      model.fetch4sVenueId(list, i);
    }
  }
};

//console.log(model.usualClubs)
model.fetchTmData();
// model.updateList(model.usualClubs);



// var vid = model.fetch4sVenueId(model.usualClubs[4]);
 //console.log(model.usualClubs);
 // console.log(model.tmClubs);
