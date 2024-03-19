const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    regNo:{
        type:String,
        requiredz:true
    },

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        requiredz:true
    }
});

module.exports = mongoose.model('Posts',postSchema);
