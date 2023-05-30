const Ticket = require('../model/schemaTicket.js');
const jwt = require('jsonwebtoken');
const { getToken, generateUniqueNumber } = require('../../middleware/index.js');

exports.createTicket = async (req, res) => {
  try {
    const token = getToken(req);
    // Verifikasi token dan dapatkan user ID
    const decodedToken = jwt.verify(token, 'secretkey');
    const userId = decodedToken.userId;
    // Ambil data dari body request
    const { category, priority, ticketNumber, message } = req.body;
    // Buat objek tiket baru
    const ticket = new Ticket({
      user: userId,
      ticketNumber: `tiket belum redy - ${generateUniqueNumber()}`,
      category,
      priority,
      pesan: message,
      status: 'Menunggu Tindakan',
    });

    // Simpan tiket ke database
    await ticket.save();

    // Berikan respon sukses
    return res.status(200).json({ message: 'Permintaan perbaikan berhasil dibuat', ticket });
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat membuat permintaan perbaikan' });
  }
};

// READ: Mendapatkan semua tiket
exports.getAllTickets = async (req, res) => {
  try {
    // Ambil query parameters dari request
    const { category, priority, status } = req.query;

    // Buat objek filter berdasarkan query parameters yang diberikan
    const filter = {};
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    // Lakukan pencarian data tiket berdasarkan filter
    const tickets = await Ticket.find(filter).sort({ createdAt: 1 });

    // Berikan respon dengan data tiket yang ditemukan
    return res.status(200).json({ tickets });
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data tiket' });
  }
};

//============

exports.getUserTickets = async (req, res) => {
  try {
    const token = getToken(req);
    // Verifikasi token dan dapatkan user ID
    const decodedToken = jwt.verify(token, 'kunci-rahasia-anda');
    // Dapatkan ID pengguna dari objek request (asumsikan sudah dilakukan autentikasi)
    const id = decodedToken.userId;

    // Lakukan pencarian data tiket berdasarkan ID pengguna
    const tickets = await Ticket.find({ user: id });

    // Berikan respon dengan data tiket yang ditemukan
    return res.status(200).json({ tickets });
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data tiket pengguna' });
  }
};

//=====================

exports.updateTicketStatus = async (req, res) => {
  try {
    // Ambil data dari body request
    const { status, message } = req.body;
    const _id = req.params.ticketId;

    // Cek apakah tiket dengan ID yang diberikan ada dalam database
    const ticket = await Ticket.findById(_id);
    if (!ticket) {
      return res.status(404).json({ message: 'Tiket tidak ditemukan' });
    }

    if (status !== 'Telah selesai') {
      // Kondisi 1: Jika status tiket belum selesai, hanya perbarui status
      ticket.status = status;
    } else {
      // Kondisi 3: Jika status tiket telah selesai, update status, tiket number, dan pesan
      ticket.status = status;
      ticket.ticketNumber = `${generateUniqueNumber()}${_id.slice(-4)}`;
      ticket.pesan = message;
    }

    // Simpan perubahan pada tiket
    await ticket.save();

    // Berikan respon sukses
    return res.status(200).json({ message: 'Tiket berhasil diperbarui', ticket });
  } catch (error) {
    // Tangani error jika terjadi
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui tiket' });
  }
};

exports.getTicketNotifikasi = async (req, res) => {
  try {
    const jumlahTiketPermintaan = await Ticket.countDocuments({ category: 'Permintaan' });

    return res.status(200).json({ jumlahTiketPermintaan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil tiket' });
  }
};
