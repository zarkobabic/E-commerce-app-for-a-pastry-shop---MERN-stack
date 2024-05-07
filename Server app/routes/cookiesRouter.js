const express = require('express')
const router = express.Router()

const {
  getAllCookies,
  getProduct,
  addCommentToProduct,
  addNewCookie
} = require('../controllers/cookiesController')

router.route('/').get(getAllCookies)
router.route('/:id').get(getProduct)
router.route('/addCommentToProduct').post(addCommentToProduct)
router.route('/add').post(addNewCookie)
module.exports = router
