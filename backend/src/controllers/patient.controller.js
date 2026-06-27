const Patient = require('../models/patient.model');

// Yangi bemor qo'shish
const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Barcha bemorlar (filter: ?status=kutmoqda)
const getAllPatients = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const list = await Patient.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Bitta bemorni olish
const getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Bemor topilmadi' });
    res.json({ success: true, data: patient });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Bemor qidirish (?q=Alisher)
const searchPatient = async (req, res) => {
  try {
    const q = req.query.q || '';
    const list = await Patient.find({
      $or: [
        { fullName: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { addPatient, getAllPatients, getPatient, searchPatient };
