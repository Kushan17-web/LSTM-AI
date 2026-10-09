const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
{
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    badge:{
        type:String,
        required:true
    },

    description:String,

    icon:String,

    xpReward:{
        type:Number,
        default:0
    },

    unlockedAt:{
        type:Date,
        default:Date.now
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Achievement",
    achievementSchema
);