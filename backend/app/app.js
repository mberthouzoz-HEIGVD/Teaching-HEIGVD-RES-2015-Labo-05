var express = require('express');
var app = express();

var colorArray = ['Blue', 'Red', 'Yellow', 'Green', 'Gray', 'Pink', 'Lila'];

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var color = colorArray[Math.floor(Math.random() * colorArray.length)];
    res.send(JSON.stringify({"color": color}));
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Listening at http://%s:%s', host, port);
});