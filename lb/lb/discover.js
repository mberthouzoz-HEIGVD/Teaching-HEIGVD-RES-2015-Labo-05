var dgram = require('dgram');
var fs = require('fs');
var exec = require('child_process').exec;

var tblServers = {};

var discover = dgram.createSocket('udp4');
var uniqueID = 0;

PROTOCOL_MULTICAST_ADDRESS = "239.255.22.5";
PROTOCOL_PORT = 9907;
TIMEOUT_DISCOVERY = 3000;

discover.bind(PROTOCOL_PORT, function() {
    discover.addMembership(PROTOCOL_MULTICAST_ADDRESS);
});

/*
Vérifie que les services annoncés soient toujours UP 
(Reçoit un heartbeat tous les temps "TIMEOUT_DISCOVERY" au maximum.

*/
var checkTimeOut = function() {
	var now = Date.now();
	for (srvType in tblServers) {
		for (ip in tblServers[srvType]) {
			if (tblServers[srvType][ip].lastupdate + TIMEOUT_DISCOVERY <= now) {
				delete tblServers[srvType][ip];
				rebuildApacheConf(srvType); 
			} else {
				console.log("%s (%d) last update %d", ip, tblServers[srvType][ip].id, tblServers[srvType][ip].lastupdate);
			}
		}
	}
}

discover.on('message', function(msg, source) {
	var srvType = JSON.parse(msg);
	var ip = source.address;

	if (!(srvType in tblServers)) {
		tblServers[srvType] = {};
	}
	
	// Nouveau serveur ?
	if (! (ip in tblServers[srvType])) {
		tblServers[srvType][ip] = {
			ip: ip,
			lastupdate: Date.now(),
			id: uniqueID++
		};
		rebuildApacheConf(srvType); // Si nouveau serveur - update apache
		console.log("%s %s", srvType, ip);
	} else {
		tblServers[srvType][ip].lastupdate = Date.now(); // Si déja présent, met à jour last_update
	}
});

// Reconstruit la configuration d'apache si un des services n'est plus disponible
function rebuildApacheConf(srvType) {
	content = "";
	// Liste de tous les serveurs
	for (ip in tblServers[srvType]) {
		content += "BalancerMember http://" + ip + ":80 route=" + tblServers[srvType][ip].id + "\n";
	}
	// écris un fichier de conf avec tous les serveurs
	fs.writeFile("/lb/" + srvType + ".conf", content, function(err) {
		if (err) return;
		// Lorsque l'écriture a été faite, restart apache
		exec("apachectl restart", function (error, stdout, stderr) {});
	})
}

setInterval(checkTimeOut, 200);
