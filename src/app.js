const dotenv = require('dotenv').load();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const routes = require('./routes');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(session({ secret: "cats" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.NODE_DATABASE, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('Connected to mlab database!');
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
  app.use('/api', routes);
});