const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time } = req.body;

    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      time,
      status: 'kutmoqda'
    });

    // Vaqtni band qilish
    await Doctor.findOneAndUpdate(
      { _id: doctorId, 'schedule.date': date, 'schedule.time': time },
      { $set: { 'schedule.$.isBusy': true } }
    );

    // Patient statusni yangilash
    await Patient.findByIdAndUpdate(patientId, { status: 'yozilgan' });

    const populated = await Appointment.findById(appointment._id)
      .populate('patient', 'fullName phone illness')
      .populate('doctor', 'fullName specialty room');

    res.status(201).json({ success: true, message: 'Qabul yaratildi', data: populated });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Qabullar ro'yxati
// Shifokor: faqat o'zinikini ko'radi
// Admin / Reception: hammasini ko'radi
const getAppointments = async (req, res) => {
  try {
    const filter = {};

    if (req.user.role === 'doctor') {
      const doc = await Doctor.findOne({ userId: req.user._id });
      if (doc) filter.doctor = doc._id;
    }

    if (req.query.status) filter.status = req.query.status;

    const list = await Appointment.find(filter)
      .populate('patient', 'fullName phone illness birthDate gender')
      .populate('doctor', 'fullName specialty room')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createAppointment, getAppointments };
