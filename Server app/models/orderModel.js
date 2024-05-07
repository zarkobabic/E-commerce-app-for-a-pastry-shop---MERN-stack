const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  idUser:{
    type: Number,
    required: [true, 'User ID must be provided'],
  },
  items: [{
    idProduct: {
      type: Number,
      required: [true, "Id of order must be provided"]
    },
    quantity: {
      type: Number,
      required: [true, "Quantity must be provided for order"]
    },
    price: {
      type: String,
      required: [true, "Quantity must be provided for order"]
    },
    title: {
      type: String,
      required: [true, 'Product title must be provided'],
    }
  }],
  idOrder:{
    type: Number,
    required: [true, 'Notification ID must be provided'],
  },
  dateCreated:{
    type: Date,
    required: [true, 'Date created must be provided']
  },
  status:{
    type: String,
      required: [true, 'Order status must be provided'],
  }
})

module.exports = mongoose.model('orders', OrderSchema);
