var ncp = require("copy-paste");
const WebSocket = require("ws");

//Disable logging
console.log = function(){};

var IP_OF_SERVER = '127.0.0.1';
if (process.argv[2]){
	IP_OF_SERVER = process.argv[2];
}
var PORTNUM = 2104;
if (process.argv[3]){
	PORTNUM = process.argv[3];
}
var ws =null
connectToServer();
function connectToServer(){
	if(ws){
		ws.close();
		ws=null;
	}
	try{
		ws = new WebSocket('ws://'+IP_OF_SERVER+':'+PORTNUM);
		ws.on('open', function open() {
			console.info('connected to server '+ IP_OF_SERVER );
		});
		ws.on('message',function(data){
			if(data){
				clientGotMessage(data);
			}else{
				console.log('undefined data recv from server');
			}
		});
		ws.on('close',function(){
			console.info('connection closed')
			console.log('retrying connection in 10 seconds');
			setTimeout(function(){
				connectToServer();
			},10000)
		})
		ws.on('error',function(){
			console.log('connection in error')
		})
	}catch(e){
		console.log('retrying connection in 10 seconds'+ e.message);
		setTimeout(function(){
			connectToServer();
		},10000)
	}
}

function sendToServer(data){
	if(ws && data){
		ws.send(data.toString());
	}else{
		console.log('not able to send '+data +' to server');
	}
}

function clientGotMessage(data){
	try{
		if(ncp && data){
		ncp.copy(data);
		}else{
			console.log('not able to copy data to clipboard '+data );
		}
	}catch(e){
		console.error('error while copying data to clipboard' + e.message);
	}
}

var lastdata=null;
setInterval(
function(){
	try{
		let tmp = ncp.paste();
		if(tmp != lastdata){
			console.log(tmp);
			lastdata = tmp;
			sendToServer(tmp);
		}		
	}catch(e){
		console.error('error while sending data ' + e.message);
	}
}
,1000);
