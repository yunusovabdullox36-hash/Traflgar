const router = require('express').Router();
const { protect, authorize } = require('../middlewares/auth.middleware');
const { addDoctor, getAllDoctors, getDoctorsBySpecialty, addSchedule } = require('../controllers/doctor.controller');

router.use(protect);

router.get('/search', authorize('admin', 'reception'), getDoctorsBySpecialty);
router.post('/', authorize('admin'), addDoctor);
router.get('/', getAllDoctors);
router.post('/:id/schedule', authorize('admin'), addSchedule);

module.exports = router;
