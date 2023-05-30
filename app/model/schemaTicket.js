const mongoose = require('mongoose');

// Skema Tiket
const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    enum: ['Permintaan', 'Keluhan', 'Masalah Teknis'],
    default: 'Permintaan',
    required: true,
  },
  ticketNumber: {
    type: [String],
    default: 'menunggu ticket',
    unique: true,
  },
  status: {
    type: String,
    enum: ['Menunggu Tindakan', 'Sedang dalam Proses', 'Sedang Direspon', 'Telah Selesai'],
    default: 'Menunggu Tindakan',
    required: true,
  },
  priority: {
    type: String,
    enum: ['Biasa', 'Urgent', 'Kritis'],
    default: 'Biasa',
  },
  pesan: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model Tiket
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
