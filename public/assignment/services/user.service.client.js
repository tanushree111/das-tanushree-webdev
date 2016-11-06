(function () {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    function UserService($http) {
        var users =
            [
                {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
                {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
                {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
                {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
            ];
        var api = {
            "createUser"   : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser

                 };
        return api;

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/"+userId;
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }
    }

})();