// routes/aiRoutes.js

const express = require("express");

const router = express.Router();

const {

    generateCategory

} = require("../controllers/aiController");

router.get("/categorize/:id", generateCategory);

module.exports = router;