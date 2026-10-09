const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {

    try {

        const notifications = await Notification
            .find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            notifications
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

exports.markAsRead = async (req, res) => {

    try {

        await Notification.findByIdAndUpdate(
            req.params.id,
            {
                isRead: true
            }
        );

        res.json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};
