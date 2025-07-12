const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middleware/auth');

// All inquiry routes require authentication
router.use(authMiddleware);

// Send an inquiry (tenants only)
router.post('/', inquiryController.sendInquiry);

// Get inquiries (landlords see inquiries for their properties, tenants see their own inquiries)
router.get('/', inquiryController.getInquiries);

// Respond to an inquiry (landlords only)
router.post('/:inquiry_id/respond', inquiryController.respondToInquiry);

module.exports = router; 