const express = require('express');
const { note } = require('../controllers');

const router = express.Router();

router.post('/note', note.addNote);
router.get('/note', note.getAllNotes);
router.get('/note/:id', note.getSingleNote);
router.put('/note/:id', note.updateNote);
router.delete('/note/:id', note.deleteNote);

module.exports = router;
