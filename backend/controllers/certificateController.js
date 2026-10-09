const Certificate = require("../models/Certificate");
const Course = require("../models/Course");
const crypto = require("crypto");

// ======================================================
// Generate Certificate
// ======================================================

exports.generateCertificate = async (req, res) => {

    try {

        const { courseId } = req.params;

        const { score = 0 } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {

            return res.status(404).json({

                success: false,

                message: "Course not found."

            });

        }

        const existingCertificate = await Certificate.findOne({

            student: req.user.id,

            course: courseId

        });

        if (existingCertificate) {

            return res.status(400).json({

                success: false,

                message: "Certificate already generated.",

                certificate: existingCertificate

            });

        }

        const certificateId = crypto.randomUUID();

        const verificationUrl = `${req.protocol}://${req.get("host")}/api/certificates/verify/${certificateId}`;

        const certificate = await Certificate.create({

            student: req.user.id,

            course: courseId,

            score,

            certificateId,

            verificationUrl,

            completedAt: new Date(),

            issuedAt: new Date()

        });

        res.status(201).json({

            success: true,

            message: "Certificate generated successfully.",

            certificate

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================================
// Get My Certificates
// ======================================================

exports.getMyCertificates = async (req, res) => {

    try {

        const certificates = await Certificate.find({

            student: req.user.id

        })

        .populate("course", "title thumbnail")

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            totalCertificates: certificates.length,

            certificates

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================================
// Get Certificate By ID
// ======================================================

exports.getCertificateById = async (req, res) => {

    try {

        const certificate = await Certificate.findById(req.params.id)

        .populate("student", "name email")

        .populate("course", "title");

        if (!certificate) {

            return res.status(404).json({

                success: false,

                message: "Certificate not found."

            });

        }

        res.status(200).json({

            success: true,

            certificate

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================================
// Verify Certificate
// ======================================================

exports.verifyCertificate = async (req, res) => {

    try {

        const certificate = await Certificate.findOne({

            certificateId: req.params.certificateId,

            status: "Active"

        })

        .populate("student", "name email")

        .populate("course", "title");

        if (!certificate) {

            return res.status(404).json({

                success: false,

                message: "Invalid certificate."

            });

        }

        res.status(200).json({

            success: true,

            verified: true,

            certificate

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

// ======================================================
// Delete Certificate
// ======================================================

exports.deleteCertificate = async (req, res) => {

    try {

        const certificate = await Certificate.findById(req.params.id);

        if (!certificate) {

            return res.status(404).json({

                success: false,

                message: "Certificate not found."

            });

        }

        await Certificate.findByIdAndDelete(req.params.id);

        res.status(200).json({

            success: true,

            message: "Certificate deleted successfully."

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};