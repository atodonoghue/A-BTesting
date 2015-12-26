/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */

var myRouter = require('./router.js');
var client = require('../clients/client.js');
myRouter.router.get('/proxy', function (req, res) {
    res.json({message: 'Request Sent'});
});