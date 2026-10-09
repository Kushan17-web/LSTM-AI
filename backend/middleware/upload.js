const multer = require("multer");

const storage = multer.memoryStorage();

const imageUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const pdfUpload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
});

const videoUpload = multer({
    storage,
    limits: {
        fileSize: 500 * 1024 * 1024,
    },
});

module.exports = {
    imageUpload,
    pdfUpload,
    videoUpload,
};