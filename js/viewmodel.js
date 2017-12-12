function ViewModel() {
    var self = this;

    var noop = 1;

    self.clubs = model.usualClubs;

    self.clubList = ko.observableArray([]);

    self.filterString = ko.observable('');

    self.showClubs = function(category) {
        self.clubList(self.clubs);
        //console.log(self.clubs);
    };

    self.showClubs();

    self.removeClub = function(club) {
        self.clubList.remove(club);
        //initMap();
    };

    self.filterClub = function(club, index){
        var patt = new RegExp(self.filterString());
        console.log(club.name + "  " + self.filterString());
        if (patt.test(club.name)){
          noop++;
        } else {
          self.removeClub(club);
        //  hideMarker(index);
        }
        resetMarkers();
    };

    self.filterList = function(){
      self.clubList().forEach(self.filterClub);
    };

}
