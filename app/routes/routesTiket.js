const express = require('express');
const router = express.Router();
const controlerTiket = require('../controller/controlerTicket.js');
const { isAdmin } = require('../../middleware/index.js');
// CREATE: Membuat tiket baru
router.post('/tickets', controlerTiket.createTicket);
// READ: Mendapatkan semua tiket
router.get('/tickets', isAdmin, controlerTiket.getAllTickets);
router.get('/tickets/userid', controlerTiket.getUserTickets);
router.get('/tickets/notif', isAdmin, controlerTiket.getTicketNotifikasi);

// UPDATE: Mengubah status tiket (hanya bisa dilakukan oleh admin)
router.put('/tickets/:ticketId', isAdmin, controlerTiket.updateTicketStatus);

module.exports = router;
