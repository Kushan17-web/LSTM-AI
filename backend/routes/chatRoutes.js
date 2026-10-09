const router=require("express").Router();

const auth=require("../middleware/authMiddleware");

const {

askCoach,

getChats

}=require("../controllers/chatController");

router.post(

"/",

auth,

askCoach

);

router.get(

"/",

auth,

getChats

);

module.exports=router;
