var app = angular.module("PortfolioApp", ["ngRoute"]);
    /* Routing. */
app.config(function($routeProvider) {
$routeProvider.when("/home", {
    templateUrl : "home.html"
})
.when("/skills", {
    templateUrl : "skills.html",
    controller: "skillsController"
})
.when("/contacts", {
    templateUrl : "contacts.html"
})
.otherwise({
    redirectTo: '/home',
});
});

/* Main Controller. */
app.controller('mainController', function($scope)
{
    
    $scope.name='';
    $scope.nameSubmitted=false;
    $scope.active=['active', 'inactive', 'inactive'];
    $scope.submitName = function()
    {
        $scope.nameSubmitted = true;
    }
    $scope.changeActive = function(activeInd)
    {
        for (i = 0; i < $scope.active.length; i++) { 
            activeInd == i ? $scope.active[i]='active' : $scope.active[i]='inactive';
        }
    }
        
        
});

   