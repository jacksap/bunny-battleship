var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');

require('dotenv').config();
require('./config/database');

var app = express();
var httpServer = http.Server(app);
require('./io').init(httpServer);

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));


// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); 

const port = process.env.PORT || 3001;

httpServer.listen(port, function() {
    console.log(`listening on port ${port}`);
});