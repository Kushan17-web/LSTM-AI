const router=require("express").Router();

const auth=require("../middleware/authMiddleware");

const role=require("../middleware/roleMiddleware");

const {

getTeacherAnalytics

}=require("../controllers/teacherAnalyticsController");

router.get(

"/",

auth,

role("teacher","admin"),

getTeacherAnalytics

);

module.exports=router;