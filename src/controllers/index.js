const mongoose = require('mongoose');
const passport = require('passport');
require('../models/Note');
require('../models/User');

const Note = mongoose.model('notes');
const User = mongoose.model('users');

const user = {
  userLogin: (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.sendStatus(403); }

      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
      });

    })(req, res, next);
  },
  userLogout: (req, res) => {
    req.logout();
    res.sendStatus(200);
  },
  userRegister: (req, res) => {
    console.log(req.body.username, req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      } else {
        passport.authenticate('local')(req, res, function() {
          res.sendStatus(201);
        });
      }
    });
  },
};

const note = {
  addNote: async (req, res) => {
    if (req.isAuthenticated()) {
      const newNoteContent = {
        type: req.body.type, // TWITTER, ARTICLE, SIMPLE
        title: req.body.title,
        description: req.body.description,
        link: req.body.url,
        thumbnail: req.body.thumbnail,
        userID: req.body.userID
      };

      try {
        const newNote = await new Note(newNoteContent).save();
        console.log('Note saved:', newNote);
        res.sendStatus(200);
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

module.exports = {
  user,
  note
};