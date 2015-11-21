var app = angular.module('boss-admin', ['ui.router']);

app.controller('pageCtrl', function($scope) {
	$scope.word = 'Hello world';
});