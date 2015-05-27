var dgram = require('dgram');

var tblFront = new Array(new Array());
var tblBack = new Array(new Array());

var discover = dgram.createSocket('udp4');


PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
PROTOCOL_PORT = 9907;
TIMEOUT_DISCOVERY = 3000;

discover.bind(PROTOCOL_PORT, function() {
    discover.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

function adresseToID(table, adresse){
	for(var i = 0; i < table.length; i++) {
		if(table[i][0] == adresse) {
			return i;
		}
	}
	return -1;
}

var checkTimeOut = function(){
	for(var i = 0; i < tblFront.length; i++){
		if((tblFront[i][1] + TIMEOUT_DISCOVERY) < Date.now()){
			console.log("frontend " + tblFront[i][0] + " is no longer connected");
			tblFront.pop(i);
		}
	}
	
	for(var i = 0; i < tblBack.length; i++){
		if((tblBack[i][1] + TIMEOUT_DISCOVERY) < Date.now()){
			console.log("backend " + tblBack[i][0] + " is no longer connected");
			tblBack.pop(i);
		}
	}	
}

discover.on('message', function(msg, source) {
	if(JSON.parse(msg) == "frontend"){
		if(adresseToID(tblFront, source.address) == -1 && adresseToID(tblFront, source.address) == -1){
			tblFront.push([source.address, Date.now()]);
			console.log("frontend " + source.address + " is now connected");			
		}else{
			tblFront[tblFront.indexOf(source.address)][1] = Date.now();	
		}
	}
	else if(JSON.parse(msg) == "backend") {
		if(adresseToID(tblBack, source.address) == -1 && adresseToID(tblBack, source.address) == -1){
			tblBack.push([source.address, Date.now()]);
			console.log("backend " + source.address + " is now connected");
		}else{
			tblBack[adresseToID(tblBack, source.address)][1] = Date.now();
		}
	}
});

setInterval(checkTimeOut, TIMEOUT_DISCOVERY);
