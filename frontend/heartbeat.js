var dgram = require('dgram');

var s = dgram.createSocket('udp4');

PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
PROTOCOL_PORT = 9907;

function HearthBeat(){

    var that = this;
    HearthBeat.prototype.update = function() {
        var payload = "frontend";
        message = new Buffer(payload);
        s.send(message, 0, message.length, PROTOCOL_PORT, PROTOCOL_MULTICAST_ADDRESS, function(err, bytes){});
    }
    setInterval(that.update, 200);
}

var beat = new HearthBeat();