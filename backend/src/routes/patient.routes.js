const router = require('express').Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { addPatient, getAllPatients, getPatient, searchPatient } = require('../controllers/patient.controller');

router.use(protect, authorize('admin', 'reception'));

router.post('/', addPatient);
router.get('/', getAllPatients);
router.get('/search', searchPatient);
router.get('/:id', getPatient);

module.exports = router;
