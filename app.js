require('./lib/helper');

var express = require('express');
var resource = require('express-resource');
var app = express.createServer();
app.configure(function() {
   this.set('view engine', 'ejs');
   this.use(express.bodyParser());
   this.use(express.methodOverride());
   this.use(express.static(__dirname + '/public'));
   this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.listen(1337);

app.get('/', function(req, res){
   res.render('index');
});

app.resource('stories', require('./lib/stories'));
