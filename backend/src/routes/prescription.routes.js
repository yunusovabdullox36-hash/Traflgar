const router = require('express').Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { createPrescription, getPendingPayments, markAsPaid } = require('../controllers/prescription.controller');

router.use(protect);

router.post('/', authorize('doctor'), createPrescription);
router.get('/pending', authorize('admin', 'reception'), getPendingPayments);
router.patch('/:id/pay', authorize('admin', 'reception'), markAsPaid);

module.exports = router;
