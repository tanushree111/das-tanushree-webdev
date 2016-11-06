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
            UserService.findUserByCredentials(user.username, user.password)
                .success(function(user){
                    $location.url("/user/" + user._id);
                })
                .error(function(){
                    vm.error = "Unable to login";
                });

        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.confirmPassword;

        function register(user) {
            if(user.password === vm.confirmPassword) {
                UserService.createUser(user)
                 .success(function(){
                    $location.url("/user/" + user._id);
                })
                    .error(function(){
                    vm.error = "Unable to register";
                });

            }else {
                vm.error = "Passwords in both fields don't match";
            }
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;

        function init() {
             UserService.findUserById(vm.userId)
                .success(function(user){
                    vm.user = user;
                })
                .error(function(){
                    vm.error = "Unable to fetch user";
                });

        }
        init();


        function updateUser(user) {
           UserService.updateUser(vm.userId, user)
               .success(function(){
                $location.url("/user/" + user._id);
               })
               .error(function(){
                vm.error = "Unable to update profile";
            });

        }

        function unregisterUser() {
            UserService.deleteUser(vm.userId)
                .success(function(){
                    $location.url("/login");
                })
                .error(function(){
                    vm.error = "Unable to unregister user";
                });

        }

    }
})();