const Pesan = require('../model/schemaPesan.js');
const User = require('../model/schemaUser.js');
const jwt = require('jsonwebtoken');
const { getToken } = require('../../middleware/index.js');

exports.kirimPesan = async (req, res) => {
  try {
    const token = getToken(req);
    // Verifikasi token dan dapatkan user ID
    const decodedToken = jwt.verify(token, 'secretkey');
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    const email = user.email;
    // Ambil data dari body request
    const { message } = req.body;
    // Buat objek tiket baru
    const pesanCount = await Pesan.countDocuments();
    const pesan = new Pesan({
      user: userId,
      pesan: message,
      email: email,
      countPesan: pesanCount,
    });

    // Simpan tiket ke database
    await pesan.save();

    // Berikan respon sukses
    return res.status(200).json({ message: 'Pesan Terkirim', pesan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat membuat permintaan' });
  }
};

exports.getPesan = async (req, res) => {
  try {
    const pesan = await Pesan.find().sort({ createdAt: -1 }).select('pesan email');

    return res.status(200).json({ pesan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pesan' });
  }
};

exports.getPesanNotifikasi = async (req, res) => {
  try {
    const jumlahPesan = await Pesan.countDocuments();

    return res.status(200).json({ jumlahPesan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil pesan' });
  }
};
