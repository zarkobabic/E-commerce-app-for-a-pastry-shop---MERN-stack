const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'product image must be provided'],
  },
  title: {
    type: String,
    required: [true, 'product title must be provided'],
  },
  description: {
    type: String,
    required: [true, 'product description must be provided'],
  },
  composition: {
    type: Array,
    required: [true, 'product composition must be provided'],
  },
  price: {
    type: String,
    required: [true, 'product price must be provided'],
  },
  comments: {
    type: Array
  },
  idProduct: {
    type: Number,
    required: [true, 'product id must be provided'],
  }
})

let CakeModel = mongoose.model('cakes', ProductSchema);
let CookieModel = mongoose.model('cookies', ProductSchema);

module.exports = {
  CakeModel,
  CookieModel
}
