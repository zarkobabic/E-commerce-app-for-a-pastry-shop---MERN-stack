const express = require('express')
const router = express.Router()

const {
  getAllPromotions,
} = require('../controllers/promotionsController')

router.route('/').get(getAllPromotions)

module.exports = router
