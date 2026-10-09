const Chat=require("../models/Chat");

const LearningAnalytics=require("../models/LearningAnalytics");

const {

generateResponse

}=require("../services/aiCoachService");

exports.askCoach=async(req,res)=>{

try{

const analytics=

await LearningAnalytics.findOne({

student:req.user.id

});

const answer=

await generateResponse(

req.body.question,

analytics

);

const chat=

await Chat.create({

student:req.user.id,

question:req.body.question,

answer

});

res.json({

success:true,

chat

});

}

catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};

exports.getChats=async(req,res)=>{

const chats=

await Chat.find({

student:req.user.id

}).sort({

createdAt:-1

});

res.json({

success:true,

chats

});

};