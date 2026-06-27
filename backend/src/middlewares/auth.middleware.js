const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ message: "Token yo'q. Avval kiring." });

    const token = header.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError')
        return res.status(401).json({ message: 'Token eskirdi', code: 'TOKEN_EXPIRED' });
      return res.status(401).json({ message: 'Token yaroqsiz' });
    }

    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) return res.status(401).json({ message: 'Foydalanuvchi topilmadi' });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: `Ruxsat yo'q. Kerakli: ${roles.join(', ')}` });
  next();
};

module.exports = { protect, authorize };
