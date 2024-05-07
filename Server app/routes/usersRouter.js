const express = require('express')
const router = express.Router()

const {
  getUserWorker,
  getUserShopper,
  getUserWithUsername,
  editUser,
  changePassword,
  getUserWithId
} = require('../controllers/usersController')

router.route('/').post(getUserWorker);
router.route('/login').post(getUserShopper);
router.route('/username').post(getUserWithUsername);
router.route('/editUser').post(editUser);
router.route('/changePassword').post(changePassword);
router.route('/:id').get(getUserWithId);

module.exports = router
