const mongoose = require('mongoose');
require('../models/Note');

const Note = mongoose.model('notes');

const note = {
  addNote: async (req, res) => {
    if (req.isAuthenticated()) {
      const newNoteContent = {
        type: req.body.type, // twitters, articles, notes
        title: req.body.title,
        content: req.body.content,
        articleUrl: req.body.articleUrl,
        twitterName: req.body.twitterName,
        userID: req.body.userID,
      };

      try {
        const newNote = await new Note(newNoteContent).save((err, note) => {
          res.send(note);
        });
        console.log('Note saved:', newNote);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }
    } else {
      res.sendStatus(403);
    }
  },
  getAllNotes: (req, res) => {
    Note.find({userID: req.body.userID})
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getAllNotesOfOneType: (req, res) => {
    Note.find({userID: req.body.userID, type: req.body.type})
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getSingleNote: (req, res) => {
    Note.findById(req.params.id)
      .then((results) => {
        if (!results) {
          res.send(404);
        } else {
          res.send(results)
        }
      })
      .catch((err) => res.send(404));
  },
  updateNote: (req, res) => {
    const updatedNoteContent = {
      type: req.body.type, // twitters, articles, simple
      title: req.body.title,
      content: req.body.content,
      articleUrl: req.body.articleUrl,
      twitterName: req.body.twitterName,
    };
    Note.findByIdAndUpdate(req.params.id, updatedNoteContent)
      .then((updatedNote) => res.send(updatedNote))
      .catch((err) => console.log(err));
  },
  deleteNote: (req, res) => {
    Note.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (!result) {
          res.sendStatus(404)
        } else {
          res.sendStatus(200);
        }
      })
      .catch((err) => res.sendStatus(500));
  }
};

module.exports = note;