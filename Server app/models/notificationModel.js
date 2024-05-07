const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  idUser:{
    type: Number,
    required: [true, 'User ID must be provided'],
  },
  items: Array,
  quantities: Array,
  idNotification:{
    type: Number,
    required: [true, 'Notification ID must be provided'],
  },
  isSuccess: {
    type: Boolean,
    required: [true, 'Success flag must be provided'],
  },
  orderDate: {
    type: Date,
    required: [true, 'Order date must be provided']
  }
})

module.exports = mongoose.model('notifications', NotificationSchema);
