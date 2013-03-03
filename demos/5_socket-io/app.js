

var express = require('express'),
	app = express(),
    io, http;

app.use(express.bodyParser());
app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/../common'));

var port = 8085;
http = app.listen(port);
io = require("socket.io").listen(http);

io.set("log level", 0);

io.sockets.on('connection', function (socket) {
    socket.on('msg', function (data) {
        io.sockets.emit("show", data);
        console.log(data);
    });
});

console.log("Listen on port " + port);
