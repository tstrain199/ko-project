function ViewModel() {
    var self = this;

    self.clubs = model.usualClubs;

    self.clubList = ko.observableArray([]);

    self.tmpList = [];

    self.filterString = ko.observable('');

    self.btn1_on = ko.observable(true);

    self.showClubs = function(category) {
        self.clubList(self.clubs);
        //console.log(self.clubs);
    };

    self.showClubs();

    self.removeClub = function(club) {
        self.clubList.remove(club);
        console.log("removed" + club);
        //initMap();

    };

    self.filterClub = function(club, index){
        var patt = new RegExp(self.filterString());
        if (patt.test(club.name)){
          self.tmpList.push(club);
        };
    };

    self.filterList = function(){
      self.clubList().forEach(self.filterClub);
      self.clubList(self.tmpList);
      self.btn1_on(false);
      resetMarkers();
    };

    self.resetAll = function() {
      self.showClubs(self.clubs);
      self.tmpList = [];
      self.btn1_on(true);
      resetMarkers();
    }
}
