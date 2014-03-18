
//Receive: button and pot
//Send: LED

// old stuff
var connect = require('connect'),
	fs = require('fs'),
	util = require('util'),
	io = require('socket.io').listen(9001), // WS port
	port = 9000; // HTTP port
	SerialPort = require("serialport").SerialPort,
	// ls /dev/tty.*
	sPort = "/dev/tty.usbmodem1411",
	// create an instance (object)
	arduino = new SerialPort(sPort, {
		baudrate: 9600
	});

//old stuff again:
// create web server using connect 
connect.createServer(
	connect.static(__dirname + '/public') // two underscores
).listen(port);
util.log('the server is running on port: ' + port);


// init socket.io
io.set('log level', 1); // 1 - reduces the socket's logging in the Terminal 
//The amount of detail that the server should output to the logger.0 - error, 1 - warn, 2 - info, 3 - debug

io.sockets.on('connection', function(socket) {
	util.log('Ooooooh, someone just poked me :)');

	socket.on('led', function(data){
		var ledOn= new Buffer(1),
		ledOff= new Buffer(1);

		ledOn[0]=0x01;
		ledOff[0]=0x00;

		if(data === true) {
			// turn on
			arduino.write(ledOn);
			util.log('LED ON');
		} else {
			// turn off
			arduino.write(ledOff);
			util.log('LED OFF');
		}

	});

});



//searial 



var getLightData01,
	sendLightData01;

var getLightData02,
	sendLightData02;

var getPotData01,
	sendPotData01;

var getPotData02,
	sendPotData02;

var getDataButton01,
	sendDataButton01;

var getDataButton02,
	sendDataButton02;

//var getDataButton03,
//	sendDataButton03;

//var getDataButton04,
//	sendDataButton04;

	arduino.on('open', function(){
		console.log('port id on');

	});


	arduino.on('data',function(data){
		


		getLightData01+=data;

		if(getLightData01.indexOf('A')>=0&&getLightData01.indexOf('B')>=0){

			sendLightData01=getLightData01.substring(getLightData01.indexOf('A')+1, getLightData01.indexOf('B'));
			getLightData01='';
			//util.log('Received data='+ getData);
			util.log(sendLightData01);
			io.sockets.emit('lightPot01', sendLightData01);

		};


		getLightData02+=data;

		if(getLightData02.indexOf('C')>=0&&getLightData02.indexOf('D')>=0){

			sendLightData02=getLightData02.substring(getLightData02.indexOf('C')+1, getLightData02.indexOf('D'));
			getLightData02='';
			//util.log('Received data='+ getData);
			util.log(sendLightData02);
			io.sockets.emit('lightPot02', sendLightData02);

		};






		

		getDataButton01+=data;

		if(getDataButton01.indexOf('I')>=0&&getDataButton01.indexOf('J')>=0){

			sendDataButton01=getDataButton01.substring(getDataButton01.indexOf('I')+1, getDataButton01.indexOf('J'));
			getDataButton01='';
			//util.log('Received data='+ getDataButton);
			util.log(sendDataButton01);
			io.sockets.emit('ardButton01', sendDataButton01);

		};

		getDataButton02+=data;

		if(getDataButton02.indexOf('K')>=0&&getDataButton02.indexOf('U')>=0){

			sendDataButton02=getDataButton02.substring(getDataButton02.indexOf('K')+1, getDataButton02.indexOf('U'));
			getDataButton02='';
			//util.log('Received data='+ getDataButton);
			util.log(sendDataButton02);
			io.sockets.emit('ardButton02', sendDataButton02);

		};

		
	});





