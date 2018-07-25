function ViewModel() {
    var self = this;

    self.clubs = model.usualClubs;

    self.clubList = ko.observableArray([]);

    self.tmpList = [];

    self.source = ko.observable("default");

    self.filterString = ko.observable('');

    self.btn1_on = ko.observable(true);
    self.btn2_on = ko.observable(true);

    self.showClubs = function() {
        self.clubList(self.clubs);
    };

    self.showClubs();

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
    };

    self.changeSource = function() {
      self.resetAll();
      if (self.source() == "tm") {
        self.clubs = model.tmClubs;
        self.showClubs();
        resetMarkers();
      } else {
        self.clubs = model.usualClubs;
        self.showClubs();
        resetMarkers();
      };
    };

    self.buildInfoWindow = function(data) {
      listInfoWindow(data);
    }
}
