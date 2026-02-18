const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook } = require('../controllers/stripeController');

router.post('/create-checkout-session', createCheckoutSession);
// Webhook route requires raw body, handled in server index or here if specific middleware is applied
router.post('/webhook', handleWebhook);

module.exports = router;
