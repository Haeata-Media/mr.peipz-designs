const express = require('express');
const router = express.Router();
const { getUsers, registerUser, loginUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/', protect, admin, getUsers);

module.exports = router;
