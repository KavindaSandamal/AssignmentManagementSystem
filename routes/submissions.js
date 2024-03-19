const express = require('express');
const router = express.Router();
const Submissions = require('../models/submissions');
const upload = require('../middleware/upload'); 

router.post('/submit', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer } = req.file;

    res.status(201).json({ message: 'File submitted successfully' });
  } catch (error) {
    console.error('Error submitting file:', error);
    res.status(500).json({ message: 'File submission failed' });
  }
});


module.exports = router;
