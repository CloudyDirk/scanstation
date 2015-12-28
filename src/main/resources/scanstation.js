var scanApp = angular.module("scanstation", []);

scanApp.service("scanservice", function($http) {

  var callback = function(data, status, headers, config) {
    alert("Callback");
  };

  this.startscan = function () {
    $http.get("/scan/batch/start")
      .success(callback)
      .error(callback);
  };
  this.nextpage = function (callback) {
    $http.get("/scan/batch/nextpage")
      .success(callback)
      .error(function(data, status, headers, config) {
        alert("No data");
        callback(undefined);
      });
  };
  this.stopscan = function (documenttitle) {
    var config = {
      "params" : {
        "documenttitle": documenttitle
      }
    };
    $http.get("/scan/batch/stop", config)
      .success(callback)
      .error(callback);
  };
});

scanApp.controller("ScanController", function($scope, scanservice) {
  $scope.startscan = function() {
    scanservice.startscan();
  };
  $scope.nextpage = function() {
    scanservice.nextpage(function($scope) {
      $scope.status="Nächste Seite";
    });
  };
  $scope.stopscan = function() {
    var documenttitle = $scope.documenttitle;
    scanservice.stopscan(documenttitle);
  };
});
