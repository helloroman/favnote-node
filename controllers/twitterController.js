const mongoose = require('mongoose');
require('../models/Twitter');

const Twitter = mongoose.model('twitters');

const twitter = {
  addTwitter: (req, res) => {
    const newTwitterContent = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
    };
    new Twitter(newTwitterContent)
      .save()
      .then(twitter => console.log('Twitter saved:', twitter))
      .then(res.sendStatus(200));
  },
  getAllTwitters: (req, res) => {
    Twitter.find({})
      .then((results) => res.send(results))
      .catch((err) => console.log(err));
  },
  getSingleTwitter: (req, res) => {
    Twitter.findOne({id: req.params.id})
      .then((twitter) => res.send(twitter))
      .catch((err) => console.log(err));
  },
  updateTwitter: (req, res) => {
    const updatedTwitterContent = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
    };

    Twitter.findByIdAndUpdate(req.params.id, updatedTwitterContent)
      .then((updatedTwitter) => res.send(updatedTwitter))
      .catch((err) => console.log(err));
  },
  deleteTwitter: (req, res) => {
    Twitter.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch((err) => console.log(err));
  }
};

module.exports = twitter;