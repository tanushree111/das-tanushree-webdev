(function () {
    angular
        .module("ReWear")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        .controller("ProfileEditController", ProfileEditController)
        .controller("SellerProfileController", SellerProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;
        vm.findEbayProd = findEbayProd;

        function login(user) {
            if (!user || !user.username || !user.password) {
                vm.error = "Username and Paassword are mandatory";
            } else {
                UserService
                    .login(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function (err) {
                            vm.error = "Invalid Username and Password";
                        });
            }
        }

        function findEbayProd() {

                UserService
                    .findEbayProd()
                    .then(
                        function (response) {
                            vm.error = "Ok";
                        },
                        function (err) {
                            vm.error = "Invalid Username and Password";
                        });

        }



    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.confirmPassword;

        function register(user) {
            if (!user || !user.username || !user.password || !vm.confirmPassword || !user.email) {
                vm.error = "Username, Password and Email are mandatory";
            } else if (user.password === vm.confirmPassword) {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        },
                        function (err){
                            vm.error = "Unable to register";
                        })

            } else {
                vm.error = "Passwords in both fields don't match";
            }
        }
    }

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;;
        vm.logout = logout;
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                });

        }

        init();


        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .success(function () {
                    $location.url("/user");
                })
                .error(function () {
                    vm.error = "Unable to update profile";
                });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }


    }

    function ProfileEditController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;;
        vm.updateUser = updateUser;
        vm.logout = logout;
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                });

        }

        init();


        function updateUser(user) {
            UserService.updateUser(vm.userId, user)
                .success(function () {
                    $location.url("/user");
                })
                .error(function () {
                    vm.error = "Unable to update profile";
                });

        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }


    }

    function SellerProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;
        vm.userId = $rootScope.currentUser._id;;
        vm.logout = logout;
        function init() {
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                })
                .error(function () {
                    vm.error = "Unable to fetch user";
                });

        }

        init();
        function toggleDropdown($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    });
        }


    }
})();