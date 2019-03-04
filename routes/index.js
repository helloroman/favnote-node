const express = require('express');
const {twitter, note, article} = require('../controllers');

const router = express.Router();

router.post('/twitter', twitter.addTwitter);
router.get('/twitter', twitter.getAllTwitters);
router.get('/twitter/:id', twitter.getSingleTwitter);
router.put('/twitter/:id', twitter.updateTwitter);
router.delete('/twitter/:id', twitter.deleteTwitter);


router.post('/note', note.addNote);
router.get('/note', note.getAllNotes);
router.get('/note/:id', note.getSingleNote);
router.put('/note/:id', note.updateNote);
router.delete('/note/:id', note.deleteNote);

router.post('/article', article.addArticle);
router.get('/article', article.getAllArticles);
router.get('/article/:id', article.getSingleArticle);
router.put('/article/:id', article.updateArticle);
router.delete('/article/:id', article.deleteArticle);

module.exports = router;
