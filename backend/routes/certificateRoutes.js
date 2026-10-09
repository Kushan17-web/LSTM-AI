const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {

    generateCertificate,
    getMyCertificates,
    getCertificateById,
    verifyCertificate,
    deleteCertificate

} = require("../controllers/certificateController");

// ======================================================
// Generate Certificate
// ======================================================

router.post(

    "/generate/:courseId",

    authMiddleware,

    roleMiddleware("student"),

    generateCertificate

);

// ======================================================
// Get My Certificates
// ======================================================

router.get(

    "/my",

    authMiddleware,

    roleMiddleware("student"),

    getMyCertificates

);

// ======================================================
// Get Certificate By ID
// ======================================================

router.get(

    "/:id",

    authMiddleware,

    getCertificateById

);

// ======================================================
// Verify Certificate (Public)
// ======================================================

router.get(

    "/verify/:certificateId",

    verifyCertificate

);

// ======================================================
// Delete Certificate (Admin)
// ======================================================

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    deleteCertificate

);

module.exports = router;