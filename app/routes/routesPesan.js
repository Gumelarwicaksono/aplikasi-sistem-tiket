const express = require('express');
const router = express.Router();
const { kirimPesan, getPesan, getNotif, getPesanNotifikasi } = require('../controller/controlerPesan.js');
const { isAdmin } = require('../../middleware/index.js');
// Rute untuk mengirim pesan
router.post('/pesan', kirimPesan);
router.get('/pesan', getPesan);
router.get('/pesan/notif', isAdmin, getPesanNotifikasi);

module.exports = router;
