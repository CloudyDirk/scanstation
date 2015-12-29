var scanApp = angular.module("scanstation", []);

scanApp.service("scanservice", function($http) {

  this.startscan = function (callback) {
    $http.get("/scan/batch/start")
      .success(callback)
      .error(callback);
  };
  this.nextpage = function (callback, page) {
    var config = {
      "params" : {
        "page": page
      }
    };
    $http.get("/scan/batch/nextpage", config)
      .success(callback)
      .error(callback);
  };
  this.stopscan = function (callback, documenttitle) {
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

  $scope.inprogress = false;
  $scope.page = 1;

  $scope.startscan = function() {
    $scope.page = 1;
    var callback = function(data, status, headers, config) {
      if (status == 200) {
        $scope.status="Seite 1 erfolgreich eingescannt";
      }
      else {
        alert("Callback");
      }
      $scope.inprogress=true;
      $scope.disabled=false;
    };

    scanservice.startscan(callback);
    $scope.status="Scannen...";
    $scope.disabled=true;
  };
  $scope.nextpage = function() {
    $scope.page += 1;
    var callback = function(data, status, headers, config) {
      if (status == 200) {
        $scope.status="Seite " + page + " erfolgreich eingescannt";
      }
      else {
        alert("Callback");
      }
      $scope.inprogress=true;
      $scope.disabled=false;
    };
    scanservice.nextpage(callback, page);
    $scope.status="Scannen von Seite " + page;
    $scope.disabled=true;
  };
  $scope.stopscan = function() {
    var documenttitle = $scope.documenttitle;
    var callback = function(data, status, headers, config) {
      if (status == 200) {
        $scope.status="Dokument " + documenttitle + " erfolgreich hinzugefügt";
      }
      else {
        alert("Callback");
      }
      $scope.inprogress=false;
      $scope.disabled=false;
    };
    scanservice.stopscan(callback, documenttitle);
    $scope.status="Dokument wird verarbeitet...";
    $scope.disabled=true;

  };
});
