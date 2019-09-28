const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.engine(
  'handlebars',
  exphbs({
      defaultLayout: 'main',
      layoutsDir: __dirname + '/views/layouts/',
      partialsDir: __dirname + '/views/partials/'
  })
);
app.set('view engine', 'handlebars');

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});

module.exports = app;