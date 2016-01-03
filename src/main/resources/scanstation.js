var scanApp = angular.module("scanstation", []);

scanApp.service("scanservice", function($http) {

  var uriRoot="/scan";

  this.startscan = function (callback) {
    $http.get(uriRoot + "/start")
      .success(callback)
      .error(callback);
  };
  this.nextpage = function (callback, page) {
    var config = {
      "params" : {
        "page": page
      }
    };
    $http.get(uriRoot + "/nextpage", config)
      .success(callback)
      .error(callback);
  };
  this.lastpage = function (callback, page, documenttitle) {
    var config = {
      "params" : {
        "page": page,
        "documenttitle": documenttitle
      }
    };
    $http.get(uriRoot + "/lastpage", config)
      .success(callback)
      .error(callback);
  };
  this.stopscan = function (callback, documenttitle) {
    var config = {
      "params" : {
        "documenttitle": documenttitle
      }
    };
    $http.get(uriRoot + "/stop", config)
      .success(callback)
      .error(callback);
  };

  this.singlepagescan = function (callback, documenttitle) {
    var config = {
      "params" : {
        "documenttitle": documenttitle
      }
    };
    $http.get(uriRoot + "/startsinglepage", config)
      .success(callback)
      .error(callback);
  };
});

scanApp.controller("ScanController", function($scope, scanservice) {

  $scope.inprogress = false;
  var page = 1;

  $scope.startscan = function() {
    page = 1;
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
  $scope.singlepagescan = function() {
    page = 1;
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
      $scope.documenttitle="";
    };
    scanservice.singlepagescan(callback, documenttitle);
    $scope.status="Dokument wird verarbeitet...";
    $scope.disabled=true;
  };
  $scope.nextpage = function() {
    page += 1;
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
    $scope.status="Scannen von Seite " + page + "...";
    $scope.disabled=true;
  };
  $scope.lastpage = function() {
    page += 1;
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
      $scope.documenttitle="";
    };
    scanservice.lastpage(callback, page, documenttitle);
    $scope.status="Dokument wird verarbeitet...";
    $scope.disabled=true;

  };
});
