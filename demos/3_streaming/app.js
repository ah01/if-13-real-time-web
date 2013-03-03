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
    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.write("<!DOCTYPE html>\n");
    res.write("<html><head>\n");
    res.write("<title>Frame</title>\n");
    res.write("</head><body>\n");
    
    button.on("click", function(msg) {
        if (res.connection.writable) {
            res.write("<script>parent.buttonPressed(" + JSON.stringify(msg) + ");</script><br>\n");
            res.write((new Array(1000).join(" ")) + "\n");
        }
    });

});

var port = 8083;
app.listen(port);
console.log("Listen on port " + port);