(function () {
    angular
        .module('WebAppMaker')
        .factory("UserService", UserService);

    function UserService() {
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
            users.push(user);
            var arr = [...(users[users.length - 1]._id)];
            var id="";
            for (var i in arr){
                var valAt = ((parseInt(arr[i])) + 1).toString();
                id = id.concat(valAt.substring(valAt.length - 1));
            }
            user._id = id;
            return user;
        }

        function findUserById(userId) {
            for (var ind in users) {
                if(userId === users[ind]._id){
                    return users[ind];
                }
            }
        }

        function findUserByUsername(username) {
            for (var ind in users) {
                if(username===users[ind].username){
                    return users[ind];
                }
            }
        }

        function findUserByCredentials(username, password) {
            for (var ind in users) {
                if(username === users[ind].username && password === users[ind].password){
                    return users[ind];
                }
            }
        }

        function updateUser(userId, newUser) {
            for (var ind in users) {
                if(userId===users[ind]._id){
                    users[ind] = Object.assign({}, newUser);
                    return users[ind];
                }
            }
        }

        function deleteUser(userId) {
            var index = users.indexOf(findUserById(userId));
            if (index > -1) {
                array.splice(index, 1);
            }
        }
    }

})();