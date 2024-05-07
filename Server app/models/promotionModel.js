const mongoose = require('mongoose')

const PromotionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Promotion image must be provided'],
  },
  title: {
    type: String,
    required: [true, 'Promotion title must be provided'],
  },
  description: {
    type: String,
    required: [true, 'Promotion description must be provided'],
  },
  idPromotion: {
    type: Number,
    required: [true, 'Promotion ID must be provided'],
  }
})

module.exports = mongoose.model('promotions', PromotionSchema);
