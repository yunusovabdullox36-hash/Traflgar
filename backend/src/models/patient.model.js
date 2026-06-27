const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  birthDate: { type: String },
  gender: { type: String, enum: ['erkak', 'ayol'] },
  illness: { type: String, required: true },
  specialty: { type: String },
  status: { type: String, enum: ['kutmoqda', 'yozilgan'], default: 'kutmoqda' }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
