const express = require('express');
const app = express();
const path = require('path');

const router = require('./routes');
const port = 2000;

//static files
app.use(express.static(path.join(__dirname, '../public')));

//ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use router
app.use('/', router);

//port
app.listen(port);
