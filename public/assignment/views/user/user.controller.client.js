(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "Unable to login";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.confirmPassword;

        function register(user) {
            if(user.password === vm.confirmPassword) {
                user = UserService.createUser(user);
                if (user) {
                    $location.url("/user/" + user._id);
                } else {
                    vm.error = "Unable to register";
                }
            }else {
                vm.error = "Passwords in both fields don't match";
            }
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();


        function updateUser(user) {
            user = UserService.updateUser(vm.userId, user);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.error = "Unable to update profile";
            }
        }

    }
})();