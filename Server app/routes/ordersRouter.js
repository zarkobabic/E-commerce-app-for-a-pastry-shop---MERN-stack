const express = require('express')
const router = express.Router()

const {
    addOrder,
    getAllOrders,
    denyOrder,
    acceptOrder
} = require('../controllers/ordersController')

router.route('/add').post(addOrder)
router.route('/all').get(getAllOrders)
router.route('/deny').post(denyOrder)
router.route('/accept').post(acceptOrder)

module.exports = router
