const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    moduleCode: {
        type: String,
        required: true,
    },
    moduleName: {
        type: String,
        required: true,
    },
    
    assignmentName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    noOfMarks: {
        type: String,
        required: true,
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Modules',
    },
});

module.exports = mongoose.model('Assignments', assignmentSchema);
