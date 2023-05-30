const jwt = require('jsonwebtoken');
const User = require('../app/model/schemaUser.js');

function getToken(req) {
  let token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
  return token && token.length ? token : null;
}

// Middleware untuk verifikasi token JWT dan role admin
function isAdmin(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Token tidak tersedia. Akses ditolak.' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secretkey');
    const userId = decodedToken.userId;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
        }

        const role = user.role;

        if (role !== 'admin') {
          return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
        }

        next();
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pengguna.' });
      });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Token tidak valid. Akses ditolak.' });
  }
}

// Fungsi untuk menghasilkan nomor unik untuk ticketNumber
function generateUniqueNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uniqueNumber = '';
  for (let i = 0; i < 6; i++) {
    uniqueNumber += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return uniqueNumber;
}

module.exports = {
  getToken,
  isAdmin,
  generateUniqueNumber,
};
