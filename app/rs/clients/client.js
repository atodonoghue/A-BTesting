/**
 * Created by ubuntu on 12/24/15.
 * Author: Austin T O'Donoghue
 */
var myRouter = require('../servers/router.js');
var request = require('request');
var async = require('async');
var diff = require('deep-diff');

myRouter.router.get('/proxy', function (req, res) {
    async.parallel([
            // First external endpoint
            function(callback) {
                var url = "http://localhost:3000/api/";
                request(url, function(err, response, body) {
                    if(err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    var obj = JSON.parse(body);
                    console.log("Hello, from Process 0");
                    console.log(body);
                    callback(false, obj);
                });
            },

            // Second external endpoint
            function(callback) {
                var url = "http://localhost:3000/api/";
                request(url, function(err, response, body) {
                    if(err) {
                        console.log(err);
                        callback(true);
                        return;
                    }
                    var obj = JSON.parse(body);
                    console.log("Hello, from Process 1");
                    console.log(body);
                    callback(false, obj);
                });
            }
        ],

        // Collate results
        function(err, results) {
            if(err) {
                console.log(err);
                res.send(500, "Server Error");
                return;
            }
            console.log(diff(results[0], results[1]));
            res.send(
                (diff(results[0], results[1])) == undefined ? "No Differences Found" : diff(results[0], results[1]))
        }
    )
}
);

