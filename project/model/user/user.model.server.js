module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);
    //var model={};

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        deleteUser: deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;



    function createUser(user){
        return UserModel.create(user);
    }

    function findUserById(userId){
        // UserModel.find({_id: userId}); //--- returns an array
        return UserModel.findById(userId); //--- returns an object
    }

    function findUserByCredentials(username, password){
        return UserModel.find( //use alternatively findOne
            {
                username: username,
                password: password
            });
    }

    function findUserByUsername(username){
        return UserModel.findOne( //use alternatively findOne
            {
                username: username,
            });
    }

    function updateUser(userId, user){
        return UserModel.update(
            {
                _id: userId
            },
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                address: user.address
            });
    }

    function deleteUser(userId){
        return UserModel.remove(
            {
                _id: userId
            });
    }

    function findWebsitesForUser(userId){
        return UserModel.findById(userId).populate("websites", "name").exec();
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

}