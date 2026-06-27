const Prescription = require('../models/prescription.model');
const Appointment = require('../models/appointment.model');

// Shifokor retsept yozadi — adminstratsiyaga yuboradi
const createPrescription = async (req, res) => {
  try {
    const { appointmentId, diagnosis, medicines, tests, totalCost, notes } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: 'Qabul topilmadi' });

    const prescription = await Prescription.create({
      appointment: appointmentId,
      patient: appointment.patient,
      doctor: appointment.doctor,
      diagnosis,
      medicines,
      tests,
      totalCost,
      notes,
    });

    // Qabul statusini "bajarildi" ga o'tkazish
    appointment.status = 'bajarildi';
    await appointment.save();

    const populated = await Prescription.findById(prescription._id)
      .populate('patient', 'fullName phone')
      .populate('doctor', 'fullName specialty room');

    res.status(201).json({
      success: true,
      message: "Retsept adminstratsiyaga yuborildi",
      data: populated
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Admin: to'lov kutayotgan retseptlar — 2-NAVBAT
const getPendingPayments = async (req, res) => {
  try {
    const list = await Prescription.find({ status: "to'lov_kutmoqda" })
      .populate('patient', 'fullName phone')
      .populate('doctor', 'fullName specialty room')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Admin: bemor to'ladi — retsept beriladi
const markAsPaid = async (req, res) => {
  try {
    const prescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      { status: "to'landi" },
      { new: true }
    ).populate('patient', 'fullName phone');

    if (!prescription) return res.status(404).json({ message: 'Topilmadi' });

    res.json({
      success: true,
      message: "To'lov qabul qilindi, retsept berildi",
      data: prescription
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createPrescription, getPendingPayments, markAsPaid };
