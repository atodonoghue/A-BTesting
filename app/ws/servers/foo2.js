/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */

var myRouter = require('./router.js');
myRouter.router.get('/2', function (req, res) {
    res.json({message: 'foo too'});
});