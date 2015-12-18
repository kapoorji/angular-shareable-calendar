angular.module("app").config(["$stateProvider", "$urlRouterProvider",
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise("/");

		// Home state routing
		$stateProvider
		.state("index", {
			url: "/",
			templateUrl: "views/calendar.input.view.html",
			controller: 'AppCtrl',
			controllerAs: 'app'
		})
		.state('output', {
			url : '/output',
			templateUrl: 'views/calendar.view.html',
			controller: 'CalendarCtrl',
			controllerAs: 'calendar'
            // we'll get to this in a bit       
        });
		
	}
]);