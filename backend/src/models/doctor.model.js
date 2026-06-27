const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialty: { type: String, required: true },
  room: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  schedule: [{
    date: String,
    time: String,
    isBusy: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
