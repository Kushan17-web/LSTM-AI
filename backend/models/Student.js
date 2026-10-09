const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    quizScore:{
        type:Number,
        default:0
    },

    assignmentScore:{
        type:Number,
        default:0
    },

    attendance:{
        type:Number,
        default:0
    },

    completionRate:{
        type:Number,
        default:0
    },

    timeSpent:{
        type:Number,
        default:0
    },

    revisionCount:{
        type:Number,
        default:0
    },

    engagement:{
        type:Number,
        default:0
    },

    learningPower:{
        type:Number,
        default:0
    },

    category:{
        type:String,
        default:"Not Assigned"
    },

    recommendation:{
        type:String,
        default:""
    }

});

module.exports = mongoose.model("Student", StudentSchema);