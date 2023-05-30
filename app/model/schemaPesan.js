const mongoose = require('mongoose');

const pesanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  pesan: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  countPesan: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pesan = mongoose.model('Pesan', pesanSchema);

module.exports = Pesan;
