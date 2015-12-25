/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */

/** Server Setup **/
var express = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var serverRouter = require('./app/ws/servers/router.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/** End Server Setup **/

/** Database Setup **/
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
/** End Database Setup **/

/** Application Initialization **/
app.use('/api', serverRouter.router);
var port = process.env.PORT || 3000;
app.listen(port);

console.log('Magic happens on port ' + port);
/** Why are you looking here? This party never stops... **/