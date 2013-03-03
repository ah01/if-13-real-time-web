/*
    Demo 1. – Long Polling
 */

var express = require('express'),
    app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/../common'));

var button = new (require('events').EventEmitter)();
button.setMaxListeners(100);

app.post('/send', function (req, res) 
{
    console.log("/send " + req.body.time + " [" + button.listeners("click").length + "]");

    var msg = {
        time: req.body.time,
        text: req.body.text
    };

    button.emit("click", msg);
    res.send("ok");
});

app.get('/changes', function (req, res) 
{
    console.log("?");
    button.once("click", function(msg) {
        console.log("click");
        if (res.connection.writable) {
            res.json(msg);
        }
    });
});

var port = 8082;
app.listen(port);
console.log("Listen on port " + port);