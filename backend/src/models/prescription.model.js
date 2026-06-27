const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diagnosis: { type: String, required: true },
  medicines: [{
    name: String,
    dosage: String,
    instructions: String,
    days: Number
  }],
  tests: [String],
  totalCost: { type: Number, required: true },
  notes: { type: String },
  status: { type: String, enum: ["to'lov_kutmoqda", "to'landi"], default: "to'lov_kutmoqda" }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
