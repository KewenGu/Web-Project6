// Author: Kewen Gu
// URL: https://kgu-cs4241-main.herokuapp.com

var express = require('express');
var path = require('path');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 8000;
var urlencodedParser = bodyParser.urlencoded({extended: false});
var movieList = fs.readFileSync("./public/src/movie-list.txt").toString().trim().split("\n");
var modifiedList = [];

app.use(express.static(path.join(__dirname, '/public')));

fs.writeFileSync("./public/src/movie-list-user.txt", movieList.join('\n'));



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/list', function(req, res) {
  res.send(JSON.stringify(modifiedList));
});


app.post('/full-list', urlencodedParser, function(req, res) {
  modifiedList = movieList;
});


app.post('/filter', urlencodedParser, function(req, res) {
  modifiedList = [];
  for (i = 0; i < movieList.length; i++) {
    pos = movieList[i].toLowerCase().search(req.body.keyword.toLowerCase());
    if (pos >= 0) {
      modifiedList.push(movieList[i]);
    }
  }
});


app.post('/add', urlencodedParser, function(req, res) {
  if (req.body.keyword) {
    movieList.push(req.body.keyword);
  }
  modifiedList = movieList;
  fs.writeFileSync("./public/src/movie-list-user.txt", modifiedList.join('\n'));
});


app.post('/remove', urlencodedParser, function(req, res) {
  if (modifiedList[req.body.keyword] != null) {
    modifiedList.splice(req.body.keyword, 1);
  }
  fs.writeFileSync("./public/src/movie-list-user.txt", modifiedList.join('\n'));
});



app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
