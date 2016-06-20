var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/acomplist';

app.listen( 3000, "localhost", function(req, res){
  console.log("Server listening on 3000");
});

app.use(express.static('public'));

app.get("/", function(req, res){
  console.log("From base url");
  res.sendFile(path.resolve('./views/index.html'));
});

app.post("/postRoute", urlencodedParser, function(req, res){
  console.log("bird is in POST with: " + req.body.task);
  pg.connect( connectionString, function(err, client, done){
    client.query("INSERT INTO list (task) VALUES ($1)", [req.body.task]);
  });
});

app.get('/getTask', function (req, res) {
  console.log("bird is getting tasks");
  var results= [];
  pg.connect( connectionString, function (err, client, done) {
    var query = client.query('SELECT * FROM list');
    console.log("bird sees: " + query);
    var rows = 0;
    query.on('row', function (row) {
      results.push(row);
    });
    query.on('end', function () {
      return res.json(results);
    });
  });//end pg
  app.post('/delPost',urlencodedParser, function (req, res) {
    console.log('bird is deleting' + req.body.id);
    pg.connect( connectionString, function (err, client, done) {

    var query = client.query('DELETE FROM list WHERE id=($1);', [req.body.id]);
});//end pg
  });//end delPost
});
