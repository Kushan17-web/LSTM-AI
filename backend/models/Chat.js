const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    question:String,

    answer:String,

    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model(
    "Chat",
    chatSchema
);