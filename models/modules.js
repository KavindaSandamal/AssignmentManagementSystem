const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    moduleCode: {
        type: String,
        required: true,
    },
    moduleName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    
});

module.exports = mongoose.model('Modules', moduleSchema);
