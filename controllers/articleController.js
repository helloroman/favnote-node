const mongoose = require('mongoose');
require('../models/Article');

const Article = mongoose.model('articles');

const article = {
  addArticle: (req, res) => {
    const newArticleContent = {
      title: req.body.title,
      description: req.body.description,
      url: req.body.url,
    };
    new Article(newArticleContent)
      .save()
      .then(idea => console.log('Idea saved:', idea))
      .then(res.sendStatus(200));
  },
  getAllArticles: (req, res) => {
    console.log('get all twitters');
  },
  getSingleArticle: (req, res) => {
    console.log('get single twitter');
  },
  updateArticle: (req, res) => {
    console.log('update single twitter');
  },
  deleteArticle: (req, res) => {
    console.log('delete single twitter');
  }
};

module.exports = article;