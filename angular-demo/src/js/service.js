app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/base');

	$stateProvider
		.state('base', {
			url:'/base',
			templateUrl: '../template/base.html'
		})
		.state('base.list', {
			url: '/list',
			templateUrl: "../template/base.list.html",
			controller: function($scope) {
				$scope.items = ["A", "List", "Of", "Items"];
			}
		})
		.state('user', {
			url: '/url',
			templateUrl: "../template/user.html"
		})
		.state('user.list', {
			url: '/list',
			templateUrl: "../template/user.list.html",
			controller: function($scope) {
				$scope.things = ["A", "Set", "Of", "Things"];
			}
		})
})