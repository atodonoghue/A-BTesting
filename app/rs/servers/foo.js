/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */

var myRouter = require('./router.js');
myRouter.router.get('/', function (req, res) {
    res.json({message: 'You were maybe looking for something more useful?'});
});