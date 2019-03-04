const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  }
});

mongoose.model('twitters', TwitterSchema);