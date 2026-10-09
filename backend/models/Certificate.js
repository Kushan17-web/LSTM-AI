const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(

    {

        student: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        course: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Course",

            required: true

        },

        certificateId: {

            type: String,

            required: true,

            unique: true,

            trim: true

        },

        score: {

            type: Number,

            default: 0,

            min: 0

        },

        completedAt: {

            type: Date,

            default: Date.now

        },

        issuedAt: {

            type: Date,

            default: Date.now

        },

        verificationUrl: {

            type: String,

            default: ""

        },

        status: {

            type: String,

            enum: ["Active", "Revoked"],

            default: "Active"

        }

    },

    {

        timestamps: true

    }

);

// Prevent duplicate certificates for the same student & course
certificateSchema.index(

    {

        student: 1,

        course: 1

    },

    {

        unique: true

    }

);

module.exports = mongoose.model(

    "Certificate",

    certificateSchema

);