const User=require("../models/User");
const Course=require("../models/Course");

const Quiz=require("../models/Quiz");
const Attempt=require("../models/QuizAttempt");
const LearningAnalytics=require("../models/LearningAnalytics");

exports.getTeacherAnalytics=async(req,res)=>{

try{

const students=await User.countDocuments({
role:"student"
});

const teachers=await User.countDocuments({
role:"teacher"
});

const courses=await Course.countDocuments();

const allCourses = await Course.find({}, "lessons");

const lessons = allCourses.reduce(
    (total, course) => total + (course.lessons?.length || 0),
    0
);

const quizzes=await Quiz.countDocuments();

const attempts=await Attempt.find();

const averageScore=
attempts.length===0
?0:
attempts.reduce(
(sum,a)=>sum+a.percentage,
0
)/attempts.length;

const topStudents=
await LearningAnalytics.find()
.populate("student","name")
.sort({xp:-1})
.limit(5);

res.json({

success:true,

statistics:{

students,

teachers,

courses,

lessons,

quizzes,

averageScore

},

topStudents

});

}

catch(err){

res.status(500).json({

success:false,

message:err.message

});

}

};