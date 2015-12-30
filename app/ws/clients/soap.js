var fs = require('fs');
var pd = require('pretty-data').pd;
var http = require('http');

fs.readFile('./app/resources/request.xml', 'utf8', function (err, data) {
    if (err) throw err;
    console.log('******* XML Input *******');
    console.log(data);
        var post_options = {
            host: 'yywasr.testroyal.tstsh.tstrccl.com',
            port: '13040',
            path: '/efcweb/services/ws/v1/EFCUtilService',
            method: 'POST',
            headers: {
                'Content-Type': 'text/xml;charset=UTF-8',
                'Content-Length': Buffer.byteLength(data)
            }
        };
        var post_req = http.request(post_options, function(response) {
            response.setEncoding('utf8');
            var str;
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log('******* XML Response *******');
                console.log(pd.xml(str));
            });
        });
        post_req.write(data);
        post_req.end();
});