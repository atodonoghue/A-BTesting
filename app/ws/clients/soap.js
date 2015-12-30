var soap = require('soap');
var parseString = require('xml2js').parseString;
var js2xmlparser = require('js2xmlparser');
var fs = require('fs');
var pd = require('pretty-data').pd;

fs.readFile('./app/resources/request.xml', 'utf8', function (err, data) {
    if (err) throw err;
    console.log('******* XML Input *******');
    console.log(data);
    parseString(data, {attrkey: '', mergeAttrs: true }, function (err, parseResult) {
        var request = parseResult;

        request['soapenv:Envelope']['attributes'] = new Array();
        for (var attributes in request['soapenv:Envelope']) {
            if (attributes.substring(0, 5) == 'xmlns') {
                request['soapenv:Envelope']['attributes'][attributes] = new Array();
                request['soapenv:Envelope']['attributes'][attributes] = request['soapenv:Envelope'][attributes][0];
                delete request['soapenv:Envelope'][attributes];
            }
            else {
                for (var keyPair in console.log(request['soapenv:Envelope']['attributes']))
                    console.log(keyPair);
                break;
            }
        }

        console.log('******* JSON Request *******');
        console.log(pd.json(request));

        var methodName = Object.keys(request['soapenv:Envelope']['soapenv:Body'][0])[0];
        var i = methodName.search(':');
        methodName = methodName.substring(i + 1, methodName.length - i + 3);
        console.log('******* Method Name *******');
        console.log(methodName);


        var wsdl = 'http://efcdev01:16120/efcweb/services/ws/v1/VoyageService?wsdl';
        soap.createClient(wsdl, function(err, client) {

            client[methodName](request, function(err, result, body) {
                console.log('******* XML Request *******');
                console.log(console.log(js2xmlparser('ignore-me', request)));
                console.log('******* XML Response *******');
                console.log(pd.xml(body));
            });
        });
    });
});