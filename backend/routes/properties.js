const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Public
router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getProperty);

// Landlord only
router.post('/', propertyController.createProperty);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router; 