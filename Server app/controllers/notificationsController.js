const NotificationModel = require('../models/notificationModel');

const getAllNotificationsForUser = async (req, res) => {
    const notifications = await NotificationModel.find({idUser : req.params.idUser})
res.status(200).json({ notifications, nbHits: notifications.length });
}

async function generateNewIdNotification() {
    try {
        const maxIdNotification = await NotificationModel.findOne().sort({ idNotification: -1 }).select('idNotification').limit(1);

        let newIdNotification;
        if (maxIdNotification) {
            newIdNotification = maxIdNotification.idNotification + 1;
        } else {
            // If no documents are present, start with 1
            newIdNotification = 1;
        }

        return newIdNotification;
    } catch (error) {
        console.error('Error generating new idNotification:', error);
        throw error;
    }
}

const addNotification = async (req, res) => {
    const {items, quantities, idUser, isSuccess, orderDate} = req.body;

    generateNewIdNotification()
    .then((newIdNotification) => {
        // Creating a new Notification document
        const newNotification = new NotificationModel({
            idUser: idUser,
            items: items,
            idNotification: newIdNotification,
            quantities: quantities,
            isSuccess: isSuccess,
            orderDate: orderDate
        });

        // Saving the new document to the database
        newNotification.save().then(result => {
            res.status(200).send({"success": true,"msg": "New notification added"});
        })
    })
}

const deleteNotificationWithId = async (req, res) => {
    const {idNotification} = req.body;
    const result = await NotificationModel.deleteOne({idNotification: idNotification});
    res.status(200).send({"success": true,"msg": "Notification successfully deleted"});
}

module.exports = {
    getAllNotificationsForUser,
    addNotification,
    deleteNotificationWithId
};
