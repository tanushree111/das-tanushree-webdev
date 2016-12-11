(function(){
    angular
        .module("ReWear")
        .config(Config);

    function Config($routeProvider,$httpProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            /*.when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })*/
            .when("/user/:uid/edit", {
                templateUrl: "views/user/profile-edit.view.client.html",
                controller: "ProfileEditController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when("/seller/", {
                templateUrl: "views/user/sell-profile.view.client.html",
                controller: "SellerProfileController",
                controllerAs: "model"
            })
            .when ("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            .otherwise({
                redirectTo: "/login"
            });
    }
        var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin')
                .success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            })
                .error(function (err){
                    $location.url('/login');
                });
            return deferred.promise;
        };

    })();