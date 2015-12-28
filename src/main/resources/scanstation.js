var scanApp = angular.module("scanstation", ["$http"]);

scanApp.service("scanservice", function($http) {
  this.startscan = function (callback) {
    $http.get("/scan/batch/start")
      .success(callback)
      .error(function(callback) {
        alert("No data");
        callback(undefined);
      });
  };
  this.nextpage = function (callback) {
    $http.get("/scan/batch/nextpage")
      .success(callback)
      .error(function(callback) {
        alert("No data");
        callback(undefined);
      });
  };
  this.stopscan = function (callback) {
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
    scanservice.startscan(function($scope) {
      $scope.status="Scan gestartet";
    });
  };
  $scope.nextpage = function() {
    scanservice.nextpage(function($scope) {
      $scope.status="Nächste Seite";
    });
  };
  $scope.stopscan = function() {
    scanservice.stopscan(function($scope) {
    $scope.status="Scan beendet";
  });
});
