const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

const mongodbUri = `mongodb://admin:romuald123@ds011422.mlab.com:11422/notes`;
mongoose.connect(mongodbUri, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  console.log('Connected!');
  app.listen('3000', () => console.log('App is listening on port 3000!'));
  app.use('/api', routes);
});