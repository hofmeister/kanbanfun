var Path = require('path');
var http = require('http');
var bodyParser = require('body-parser');

http.globalAgent.maxSockets = 1000;

var express = require('express');

var app = express();

app.use(require('compression')())
	.use(require('cookie-session')({
		keys: ['asdasdpoiu90', 'k90sdfjasda']
	}));


app.use('/public/',express.static(Path.resolve(__dirname, '../../public/')))
	.use('/public/views/',express.static(Path.resolve(__dirname, '../browser/views/')));

app.use(bodyParser.json())
	.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
	res.sendFile(Path.resolve(__dirname, '../browser/bootstrap.html'));
});

var server = http.createServer(app);
server.listen(3000);
