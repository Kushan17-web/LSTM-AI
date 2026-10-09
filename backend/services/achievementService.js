const Achievement = require("../models/Achievement");

const unlockAchievement = async (
student,
badge,
description,
icon,
xpReward=0
)=>{

const exists=await Achievement.findOne({
student,
badge
});

if(exists)
return;

await Achievement.create({

student,
badge,
description,
icon,
xpReward

});

};

module.exports={

unlockAchievement

};