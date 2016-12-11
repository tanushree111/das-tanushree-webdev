(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $rootScope, UserService) {
        var vm = this;
        vm.login = login;

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
                            $location.url("/user");
                        },
                        function (err) {
                            vm.error = "Invalid Username and Password";
                        });
            }
        }

    }

    function RegisterController($location, $rootScope, UserService) {
        var vm = this;
        vm.register = register;
        vm.confirmPassword;

        function register(user) {
            if (!user || !user.username || !user.password || !vm.confirmPassword) {
                vm.error = "All fields are mandatory";
            } else if (user.password === vm.confirmPassword) {
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user");
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
        vm.userId = $rootScope.currentUser._id;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
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

        function unregisterUser() {
            UserService.deleteUser(vm.userId)
                .success(function () {
                    $location.url("/login");
                })
                .error(function () {
                    vm.error = "Unable to unregister user";
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
})();