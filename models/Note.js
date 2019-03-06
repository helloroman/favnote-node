const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    defualt: null,
  },
  thumbnail: {
    type: String,
    default: null,
  }
});

mongoose.model('notes', NoteSchema);