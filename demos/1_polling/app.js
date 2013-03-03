/*
    Demo 1. – Polling
 */

var express = require('express'),
    app = express();

app.use(express.bodyParser());
app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/../common'));


var lastEvent = {time: 0, text: null, t: 0};


app.post('/send', function (req, res) 
{
    lastEvent = {
        time: + new Date(),
        t: req.body.time,
        text: req.body.text
    };
    console.log("/send " + lastEvent.time);
    res.send("ok");
});

app.get('/changes', function (req, res) 
{
    if (lastEvent.time > req.query.from)
    {
    res.json(lastEvent);
    }
    else
    {
        res.json(null);
    }
});

var port = 8081;
app.listen(port);
console.log("Listen on port " + port);