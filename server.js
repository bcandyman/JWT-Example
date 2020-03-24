// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');

var express = require('express');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8081;

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

// Static directory
app.use(express.static('public'));

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const { id } = jwt.verify(token, process.env.APP_SECRET);
    req.user = id;
  }
  next();
});

// Routes
// =============================================================
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
  });
});
