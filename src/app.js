const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

dotenv.load();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.NODE_DATABASE, { useNewUrlParser: true });

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('Connected to mlab database!');
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
  app.use('/api', routes);
});