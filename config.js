var config = {
  GOOGLE : 'AIzaSyC9J8hskzcIDdAS6E-ISNkPkld49q7ds_c',
  TM : 'pRZh7znoV9HKvcHqyjPS98Ftw4dYXF0J',
  FourSquareID : 'XN55DS4DVJZQLSGGSZ3ZWM5HJYLDXMOD21LYJFU2R1DZWQWE',
  FourSquareSecret : 'MNMNXPO1W2BF5LNSWYIUJ0YAHXVSRHDI5SUSWHO0IAKDGXZY'
}
 https://api.foursquare.com/v2/venues/search?limit-1&client_id=XN55DS4DVJZQLSGGSZ3ZWM5HJYLDXMOD21LYJFU2R1DZWQWE&client_secret=MNMNXPO1W2BF5LNSWYIUJ0YAHXVSRHDI5SUSWHO0IAKDGXZY&ll=function(){return%20a},function(){return%20b}&query=The%20Blue%20Note&v=20170801


 function addMarkerWithTimeout(position, timeout) {
        window.setTimeout(function() {
          markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
          }));
        }, timeout);
      }
