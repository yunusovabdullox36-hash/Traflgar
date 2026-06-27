const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/patients', require('./patient.routes'));
router.use('/doctors', require('./doctor.routes'));
router.use('/appointments', require('./appointment.routes'));
router.use('/prescriptions', require('./prescription.routes'));

module.exports = router;
