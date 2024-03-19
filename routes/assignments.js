const express = require('express');
const router = express.Router();
const Assignments = require('../models/assignments');
const Modules = require('../models/modules'); 

// Create a new assignment
router.post('/assignment', async (req, res) => {
  try {
    const { moduleCode, moduleName, assignmentName, description, deadline, noOfMarks } = req.body;

    
    const module = await Modules.findOne({ moduleCode });

    if (!module) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

    
    const newAssignment = new Assignments({
      moduleCode,
      moduleName,
      assignmentName,
      description,
      deadline,
      noOfMarks,
      module: module._id, 
    });

    await newAssignment.save();
    res.status(201).json({ success: 'Assignment Saved Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




// Get all assignments
router.get('/assignments', async (req, res) => {
  try {
    const assignments = await Assignments.find().populate({
      path: 'module',
      select: 'moduleCode moduleName', 
    }).exec();

    const formattedAssignments = assignments.map((assignment) => ({
      _id: assignment._id,
      assignmentName: assignment.assignmentName,
      moduleCode: assignment.module ? assignment.module.moduleCode : 'N/A',
      moduleName: assignment.module ? assignment.module.moduleName : 'N/A',
      description: assignment.description,
      deadline: assignment.deadline,
      noOfMarks: assignment.noOfMarks,
    }));

    res.status(200).json({ success: true, existingAssignments: formattedAssignments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



//get a specific assignment

router.get('/assignment/:id', async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const assignment = await Assignments.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    return res.status(200).json({ success: true,assignment });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/assignment/ret/:moduleId', async (req, res) => {
  try {
    const module = req.params.moduleId;
    
    
    const assignments = await Assignments.find({ module }); 
    
    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ success: false, message: 'No assignments found for this module' });
    }

    return res.status(200).json({ success: true, assignments });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});



// Update an assignment
router.put('/assignment/update/:id', async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { moduleCode, assignmentName, description, deadline, noOfMarks } = req.body;

    const assignment = await Assignments.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }


    const module = await Modules.findOne({ moduleCode });

    if (!module) {
      return res.status(404).json({ success: false, message: 'Module not found' });
    }

 
    assignment.assignmentName = assignmentName;
    assignment.description = description;
    assignment.deadline = deadline;
    assignment.noOfMarks = noOfMarks;
    assignment.module = module._id; 

    await assignment.save();

    res.status(200).json({ success: 'Update Successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Delete an assignment
router.delete('/assignment/delete/:id', async (req, res) => {
  try {
    const deleteAssignment = await Assignments.findByIdAndRemove(req.params.id).exec();
    if (!deleteAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json({ message: 'Delete Successful', deleteAssignment });
  } catch (error) {
    res.status(400).json({ message: 'Delete unsuccessful', error: error.message });
  }
});





module.exports = router;
