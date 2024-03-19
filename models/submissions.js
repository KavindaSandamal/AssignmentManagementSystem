const mongoose = require('mongoose');

const submisionSchema = new mongoose.Schema({
    file: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Submissions', submisionSchema);
