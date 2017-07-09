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
  var date = new Date(request.params[0]);
  if(typeof date != 'undefined' && date){
    response.send(new Date(request.params[0]));
  }
  if(request.params[0].includes(" ")){
    var unixTime = new Date(request.params[0]).getTime() / 1000;
    response.send({unix: String(unixTime), natural: request.params[0]});
  }
  else{
    var date = new Date(request.params[0] * 1000),
    locale = "en-us",
    month = date.toLocaleString(locale, { month: "long" });
    response.send({unix: request.params[0], natural: month + " " + date.getDate() + ", " + date.getFullYear()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
