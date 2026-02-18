const express = require('express');
const router = express.Router();
const { createCommission, getCommissions, getCommissionById, updateCommissionStatus } = require('../controllers/commissionController');
const { protect, admin } = require('../middleware/auth');

router.post('/', createCommission);
router.get('/', protect, admin, getCommissions);
router.get('/:id', protect, admin, getCommissionById);
router.put('/:id', protect, admin, updateCommissionStatus); // Protection middleware to be added

module.exports = router;
