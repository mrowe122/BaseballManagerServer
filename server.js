//base setup
var express		= require('express');
var mongoose	= require('mongoose');
var bodyParser	= require('body-parser');
var morgan		= require('morgan');
var config		= require('./config');

var app			= express();

//connect to mongodb
mongoose.connect(config.database);
mongoose.connection.on('error', function(err){
	console.log('Error: could not connect to MongoDB.'.red);
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app,express);
app.use('/api', apiRoutes);

//start the server
app.listen(config.port);
console.log('Express router listening on port: ' + config.port);