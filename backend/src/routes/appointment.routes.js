const router = require('express').Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { createAppointment, getAppointments } = require('../controllers/appointment.controller');

router.use(protect);

router.post('/', authorize('admin', 'reception'), createAppointment);
router.get('/', getAppointments);

module.exports = router;
