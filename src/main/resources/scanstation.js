var scanApp = angular.module("scanstation", []);

scanApp.service("scanservice", function($http) {

  this.startscan = function () {
    $http.get("/scan/batch/start", config)
      .success()
      .error();
  };
  this.nextpage = function (callback) {
    $http.get("/scan/batch/nextpage")
      .success(callback)
      .error(function(callback) {
        alert("No data");
        callback(undefined);
      });
  };
  this.stopscan = function (documenttitle) {
    var config = {
      "params" : {
        "documenttitle": documenttitle
      };
    };
    $http.get("/scan/batch/stop")
      .success(callback)
      .error(function(callback) {
        alert("No data");
        callback(undefined);
      });
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
