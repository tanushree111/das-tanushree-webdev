var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
//var ebay = require('ebay-api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET  || "secret" }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

require ("./test/app.js")(app);
require("./assignment/app.js")(app);
//require("./project/app.js")(app);

var ipaddress = process.env.IP;
var port      = process.env.PORT || 3000;

app.listen(port, ipaddress);
