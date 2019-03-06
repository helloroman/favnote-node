const mongoose = require('mongoose');
require('../models/Note');

const Note = mongoose.model('notes');

const note = {
  addNote: (req, res) => {
    const newNoteContent = {
      type: req.body.type, // TWITTER, ARTICLE, SIMPLE
      title: req.body.title,
      description: req.body.description,
      link: req.body.url,
      thumbnail: req.body.thumbnail,
    };

    new Note(newNoteContent)
      .save()
      .then(note => {
        console.log('Note saved:', note);
        res.sendStatus(200);
      })
      .catch((err) => console.log(err));
  },
  getAllNotes: (req, res) => {
    Note.find({})
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getAllNotesOfOneType: (req, res) => {
    Note.find({type: req.params.type})
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getSingleNote: (req, res) => {
    Note.findOne({id: req.params.id})
      .then((twitter) => res.send(twitter))
      .catch((err) => console.log(err));
  },
  updateNote: (req, res) => {
    const updatedNoteContent = {
      type: req.body.type, // TWITTER, ARTICLE, SIMPLE
      title: req.body.title,
      description: req.body.description,
      link: req.body.url,
      thumbnail: req.body.thumbnail,
    };
    Note.findByIdAndUpdate(req.params.id, updatedNoteContent)
      .then((updatedNote) => res.send(updatedNote))
      .catch((err) => console.log(err));
  },
  deleteNote: (req, res) => {
    Note.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err));
  }
};

module.exports = note;