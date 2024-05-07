const express = require('express')
const router = express.Router()

const {
  getAllCakes,
  getProduct,
  addCommentToProduct,
  addNewCake
} = require('../controllers/cakesController')

router.route('/').get(getAllCakes)
router.route('/:id').get(getProduct)
router.route('/addCommentToProduct').post(addCommentToProduct)
router.route('/add').post(addNewCake)

module.exports = router
