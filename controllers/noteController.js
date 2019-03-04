const mongoose = require('mongoose');
require('../models/Note');

const Note = mongoose.model('notes');

const note = {
  addNote: (req, res) => {
    const newNoteContent = {
      title: req.body.title,
      description: req.body.description,
    };
    new Note(newNoteContent)
      .save()
      .then(idea => console.log('Note saved:', idea))
      .then(res.send(200));
  },
  getAllNotes: (req, res) => {
    console.log('get all twitters');
  },
  getSingleNote: (req, res) => {
    console.log('get single twitter');
  },
  updateNote: (req, res) => {
    console.log('update single twitter');
  },
  deleteNote: (req, res) => {
    console.log('delete single twitter');
  }
};

module.exports = note;