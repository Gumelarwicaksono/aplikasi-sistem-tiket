const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/schemaUser.js');
const { getToken } = require('../../middleware/index.js');

// Register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same email already exists' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//===============================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email atau password tidak valid' });
    }

    // Periksa password menggunakan bcrypt
    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Email atau password tidak valid' });
    }

    // Cek apakah pengguna memiliki token yang masih valid
    if (user.token && jwt.verify(user.token, 'secretkey')) {
      // Pengguna sudah memiliki token yang valid, langsung login
      return res.status(200).json({ token: user.token });
    }

    // Membuat token JWT dengan masa berlaku 1 hari (24 jam)
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '24h' });

    // Simpan token ke database
    user.token = token;
    await user.save();

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = getToken(req); // Mendapatkan token dari permintaan

    // Periksa apakah ada token
    if (!token) {
      return res.status(401).json({ message: 'Tidak ada token yang diberikan' });
    }

    const user = await User.findOneAndUpdate(
      { token: token }, // Cari pengguna berdasarkan token
      { $unset: { token: 1 } }, // Hapus token dari pengguna
      { new: true, useFindAndModify: false } // Opsi pengaturan
    );

    // Periksa apakah pengguna ditemukan
    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Logout berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

exports.me = async (req, res) => {
  try {
    // Ambil token dari permintaan
    const token = req.headers.authorization.split(' ')[1];

    // Temukan pengguna berdasarkan token
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
