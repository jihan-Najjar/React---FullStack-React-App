// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// @route GET /api/notes
// @desc Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route GET /api/notes/:id
// @desc Get a single note
router.get('/:id', getNote, (req, res) => {
  res.json(res.note);
});

// @route POST /api/notes
// @desc Create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route PUT /api/notes/:id
// @desc Update a note
router.put('/:id', getNote, async (req, res) => {
  const { title, content } = req.body;
  if (title != null) {
    res.note.title = title;
  }
  if (content != null) {
    res.note.content = content;
  }

  try {
    const updatedNote = await res.note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route DELETE /api/notes/:id
// @desc Delete a note
router.delete('/:id', getNote, async (req, res) => {
  try {
    await res.note.remove();
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a note by ID
async function getNote (req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: 'Cannot find note' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.note = note;
  next();
}

module.exports = router;