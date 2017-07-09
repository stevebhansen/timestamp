// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.all("/*", function (request, response) {
  if(!isDate(request.params[0])){
    response.send("invalid date");
  }
  if(request.params[0].includes(" ")){
    var unixTime = new Date(request.params[0]).getTime() / 1000;
    response.send({unix: String(unixTime), natural: request.params[0]});
  }
  else{
    var natural = new Date(request.params[0] * 1000),
    locale = "en-us",
    month = natural.toLocaleString(locale, { month: "long" });
    response.send({unix: request.params[0], natural: month + " " + natural.getDate() + ", " + natural.getFullYear()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var isDate = function(date) {
    return (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) )  ? true : false;
}