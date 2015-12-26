/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */

var express = require('express');
var router = express.Router();

exports.router = router;

require('./proxy.js');
require('./foo.js');
require('./foo2.js');
require('./foo3.js');


