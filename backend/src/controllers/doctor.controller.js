const Doctor = require('../models/doctor.model');

// Yangi shifokor qo'shish
const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Barcha shifokorlar
const getAllDoctors = async (req, res) => {
  try {
    const list = await Doctor.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, count: list.length, data: list });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Ixtisoslik bo'yicha qidirish (?specialty=kardiolog&date=2025-06-20)
const getDoctorsBySpecialty = async (req, res) => {
  try {
    const { specialty, date } = req.query;
    const filter = {};
    if (specialty) filter.specialty = { $regex: specialty, $options: 'i' };

    let doctors = await Doctor.find(filter).populate('userId', 'name email');

    // Agar sana berilgan bo'lsa — bo'sh vaqtlarni ko'rsatish
    if (date) {
      doctors = doctors.map(doc => {
        const docObj = doc.toObject();
        docObj.availableSlots = (doc.schedule || []).filter(s => s.date === date && !s.isBusy);
        return docObj;
      });
    }

    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Shifokorga vaqt jadvali qo'shish
const addSchedule = async (req, res) => {
  try {
    const { date, time } = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Shifokor topilmadi' });

    doctor.schedule.push({ date, time, isBusy: false });
    await doctor.save();

    res.json({ success: true, data: doctor });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { addDoctor, getAllDoctors, getDoctorsBySpecialty, addSchedule };
