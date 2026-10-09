const {
unlockAchievement
}=require("./achievementService");

const checkAchievements=async(
student,
analytics,
score
)=>{

if(analytics.completedQuizzes===1){

await unlockAchievement(

student,

"First Quiz",

"Completed first quiz",

"🥇",

50

);

}

if(analytics.streak>=7){

await unlockAchievement(

student,

"7 Day Streak",

"Studied for 7 days",

"🔥",

100

);

}

if(score===100){

await unlockAchievement(

student,

"Perfect Score",

"Scored 100%",

"💯",

150

);

}

};

module.exports={
checkAchievements
};