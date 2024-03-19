const express = require('express');
const router = express.Router();
const Modules = require('../models/modules'); 

router.post('/module/save', async (req, res) => {
    try {
        const newModule = new Modules(req.body);

        const savedModule = await newModule.save();

        res.status(201).json({ message: 'Module saved successfully', newModule: savedModule });
    } catch (error) {
      
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error', error: error.message });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});


// Get all modules
router.get('/modules', async (req, res) => {
    try {
      const modules = await Modules.find().exec();
      res.status(200).json({ success: true, existingModules: modules });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create a new module
router.post('/module', async (req, res) => {
    try {
        const newModule = new Modules(req.body);
        await newModule.save();
        res.status(201).json({ success: 'Module Saved Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//get a specific module

router.get('/module/:id', async (req, res) => {
    try {
      const moduleId = req.params.id;
      const module = await Modules.findById(moduleId);
  
      if (!module) {
        return res.status(404).json({ success: false, message: 'Module not found' });
      }
  
      return res.status(200).json({ success: true, module });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
});

  
  // Update a module
router.put('/module/update/:id', async (req, res) => {
    try {
        await Modules.findByIdAndUpdate(req.params.id, { $set: req.body }).exec();
        res.status(200).json({ success: 'Update Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a module
router.delete('/module/delete/:id', async (req, res) => {
    try {
        const deleteModule = await Modules.findByIdAndRemove(req.params.id).exec();
        if (!deleteModule) {
        return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Delete Successful', deleteModule });
    } catch (error) {
        res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
    }
});

module.exports = router;
