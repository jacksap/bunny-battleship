var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

require('dotenv').config();
require('./config/database');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth'));

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/highscores', require('./routes/api/highscores'));


// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); 

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Port ${port} listening.`);
});

