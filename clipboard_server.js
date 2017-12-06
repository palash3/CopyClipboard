const WebSocket = require("ws");
var uuid = require('uuid');
//Disable logging
console.log = function(){};
var portNum = 2104;
if (process.argv[2]){
	portNum = process.argv[2];
}
var connected_clients={};
var ws =null
//Create server
createServer();
function createServer(){
	if(ws){
		ws.close();
		ws=null;
	}
	try{
		const wss = new WebSocket.Server({ port: portNum });
		wss.on('connection', function connection(ws) {
			ws.uuid = uuid.v4();
			connected_clients[ws.uuid] = ws;
			console.info("Clients connected "  +Object.keys(connected_clients));
			ws.on('message', function incoming(message) {
				sendToClient(message);
			});
			ws.on('close',function(){
				delete connected_clients[ws.uuid];
				console.info("Clients left "  +Object.keys(connected_clients).length);
			});
		});
	}catch(e){
		console.log('retrying connection in 10 seconds'+ e.message);
		setTimeout(function(){
			createServer();
		},10000)
	}
}

function sendToClient(data){
	try{
		if(Object.keys(connected_clients).length != 0 && data){
			for(var key in connected_clients){
				if(connected_clients[key].send)
					connected_clients[key].send(data.toString());
			}
		}else{
			console.log('not able to send '+data +' to clients');
		}
	}catch(e){
		console.error('not able to send '+data +' to clients '+e.message);
	}
	
}