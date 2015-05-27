var dgram = require('dgram');
var tblFront = [];
var tblBack = [];

var discover = dgram.createSocket('udp4');


PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
PROTOCOL_PORT = 9907;

discover.bind(PROTOCOL_PORT, function() {
    discover.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

discover.on('message', function(msg, source) {

    if(tblFront.indexOf(source.address) == -1 && tblBack.indexOf(source.address) == -1){

        if(msg == "frontend"){
            tblFront.push(source.address);
        }
        else if(msg == "backend") {
            tblBack.push(source.address);
        }
    }
});