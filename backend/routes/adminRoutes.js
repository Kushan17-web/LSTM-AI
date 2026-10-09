const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
    getDashboard,
} = require("../controllers/adminController");

router.get(
    "/dashboard",
    auth,
    role("admin"),
    getDashboard
);

module.exports = router;