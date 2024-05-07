const express = require('express')
const router = express.Router()

const {
  getAllNotificationsForUser,
  addNotification,
  deleteNotificationWithId

} = require('../controllers/notificationsController')

router.route('/:idUser').get(getAllNotificationsForUser)
router.route('/add').post(addNotification);
router.route('/delete').post(deleteNotificationWithId);
module.exports = router
