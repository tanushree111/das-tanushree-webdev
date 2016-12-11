module.exports = function(app, model) {
    var multer = require('multer'); // npm install multer --save
    var mime = require('mime'); // npm install mime --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+'/../../public/project/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({ storage: storage });
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));

    var FacebookStrategy = require('passport-facebook').Strategy;
    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID || "371485699854443",
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET || "c0722281ba647761f59704ac4dc346fc",
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL || "http://localhost:3000/auth/facebook/callback"
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var bcrypt = require("bcrypt-nodejs");

    app.post('/api/upload', upload.single('myFile'), uploadImage);
    app.post('/api/user', createUser);
    app.get('/api/user', findUser);
    app.get('/api/user/:uid', findUserById);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.post ('/api/register', register);
    app.get ('/api/loggedin', loggedin);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/index.html#/user',
            failureRedirect: '/project/index.html#/login'
        }));
    function findUser(req, res){
        var query = req.query;
        if(query.password && query.username){
            findUserByCredentials(req, res);
        }else{
            findUserByUsername(req, res);
        }

    }

    function findUserByUsername(req, res){
        var username = req.query.username;

        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(users){
                    if(users.length > 0) {
                        res.json(users[0]);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;

        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function(users){
                    if(users.length > 0) {
                        res.json(users[0]);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
        /*for(var u in users){
            if(users[u].username === username && users[u].password === password){
                res.send(users[u]);
                return;
            }
        }
        res.send(0);*/
    }

    function findUserById(req, res){
        var userId = req.params.uid;
        /*for(var u in users){
            if(users[u]._id === userId){
                res.send(users[u]);
                return;
            }
        }*/
        model
            .userModel
            .findUserById(userId)
            .then(
                function(user){
                    if(user) {
                        res.json(user);
                    }else{
                        res.send('0');
                    }
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function createUser(req, res){
        var user = req.body;
        /*user._id = (new Date()).getTime().toString();
        users.push(user);*/
        model
            .userModel
            .createUser(user)
            .then(
                function(newUser){
                    res.send(newUser);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.uid;
        /*for(var u in users){
            if(users[u]._id === uid){
                users[u] = user;
            }
        }
        res.send(200);*/
        model
            .userModel
            .updateUser(uid, user)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteUser(req, res){
        var uid = req.params.uid;
        model
            .userModel
            .deleteUser(uid)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(error){
                    res.sendStatus(400).send(error);
                }
            );
        /*for(var u in users){
            if(users[u]._id === uid){
                users.splice(u, 1);
            }
        }
        res.send(200);*/
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model
            .userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
    .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            },
        function(err){
            res.status(400).send(err);
        }
        );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName:  names[1],
                            firstName: names[0],
                            email:     profile.emails ? profile.emails[0].value:"",
                            facebook: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function uploadImage(req, res) {
        var url = "";
        var userId = req.body.userId;
        var myFile = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        if(userId != null && userId != "") {
            model
                .userModel
                .findUserById(userId)
                .then(
                    function(user){
                        if(user) {
                            user.url = '/project/uploads/' + filename;
                            model
                                .userModel
                                .updateUser(userId, user)
                                .then(
                                    function(status){
                                        url = '../project/index.html#/user/' + userId;
                                        res.redirect(url);
                                    },
                                    function(error){
                                       // res.sendStatus(400).send(error);
                                    }
                                );

                        }else{
                            url = '#';
                        }

                    },
                    function(error){
                        url = '#';
                    }
                );
        }else{
            url = '#'
        }


    }
/*    var params = {
        keywords: ["Canon", "Powershot"],

        // add additional fields
        outputSelector: ['AspectHistogram'],

        paginationInput: {
            entriesPerPage: 10
        },

        itemFilter: [
            {name: 'FreeShippingOnly', value: true},
            {name: 'MaxPrice', value: '150'}
        ],

        domainFilter: [
            {name: 'domainName', value: 'Digital_Cameras'}
        ]
    };

    function findEbayProd(req, res) {
        var items;
        ebay.xmlRequest({
                serviceName: 'Finding',
                opType: 'findItemsByKeywords',
                appId: 'Tanushre-Sharedro-PRD-e45f30466-769092f5',      // FILL IN YOUR OWN APP KEY, GET ONE HERE: https://publisher.ebaypartnernetwork.com/PublisherToolsAPI
                params: params,
                parser: ebay.parseResponseJson    // (default)
            },
            // gets all the items together in a merged array
            function itemsCallback(error, itemsResponse) {
                if (error) throw error;

                items = itemsResponse.searchResult.item;

                console.log('Found', items.length, 'items');

                for (var i = 0; i < items.length; i++) {
                    console.log('- ' + items[i].title);
                }
            }
        );
        res.send(items)
    };*/
}