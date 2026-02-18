const express = require('express');
const router = express.Router();
const { createCommission, getCommissions } = require('../controllers/commissionController');

router.post('/', createCommission);
router.get('/', getCommissions); // Protection middleware to be added

module.exports = router;
