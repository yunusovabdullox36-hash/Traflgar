const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('⚠️ MONGO_URI topilmadi. MongoDB ulanmadi. Server ishlaydi, lekin ma\'lumotlar bazasiz.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB ulandi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB xatosi: ${error.message}`);
    // Production da process.exit() qilmaymiz — server health check dan o'ta oladi
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

// MongoDB connection eventlari
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB uzildi');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB error: ${err.message}`);
});

module.exports = connectDB;
