

var express = require('express'),
	ws = require('websocket.io'),
    app = express(),
    http, server;


app.use(express.bodyParser());
app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/../common'));

var button = new (require('events').EventEmitter)();
button.setMaxListeners(100);

var port = 8084;
http = app.listen(port);
server = ws.attach(http);

server.on('connection', function (socket) {

	console.log("connection");

    var handler = function (msg) {
        socket.send( msg);
    };

	button.on("click", handler);

	socket.on("message", function (msg) {
		console.log(msg);
		button.emit("click", msg);
	});

    socket.on("close", function () {
        console.log("close");
        button.removeListener("click", handler);
    });
  
});

console.log("Listen on port " + port);
