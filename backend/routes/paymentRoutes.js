const router = require('express').Router();
const { updatePaymentStatus } = require('../controllers/paymentController');

// Mark payment completed/pending
router.patch('/status', updatePaymentStatus);

module.exports = router;
