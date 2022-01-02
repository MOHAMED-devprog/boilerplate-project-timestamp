// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  var date = req.params.date;
  var unix;
  var utc;
  if (!isNaN(date) && new Date(Number(date)).getTime() > 0) {
    unix = Number(date);
    utc = new Date(Number(date)).toUTCString();
    return res.json({ unix: unix, utc: utc });
  } else if (!isNaN(new Date(date).getTime())) {
    var d = new Date(date);
    unix = d.getTime();
    utc = d.toUTCString();
    return res.json({ unix: unix, utc: utc });
  }
  return res.json({ error: "Invalid Date" });
});

app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString(),
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
