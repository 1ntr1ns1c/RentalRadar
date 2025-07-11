const { Property, User } = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

function getUserFromReq(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

exports.createProperty = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user || user.role !== 'landlord') {
    return res.status(403).json({ message: 'Only landlords can add properties.' });
  }
  try {
    const { title, description, city, neighbourhood, price, bedrooms, bathrooms, images, property_type } = req.body;
    
    // Debug: Log the images being saved
    console.log('Images being saved:', images);
    console.log('Type of images:', typeof images);
    console.log('Is array?', Array.isArray(images));
    
    const property = await Property.create({
      title,
      description,
      city,
      neighbourhood,
      price,
      bedrooms,
      bathrooms,
      images,
      is_available: true,
      created_by: user.id,
      property_type,
    });
    
    // Debug: Log what was actually saved
    console.log('Property saved with images:', property.images);
    console.log('Type of saved images:', typeof property.images);
    
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create property', error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const where = {};
    if (req.query.city) where.city = req.query.city;
    if (req.query.bedrooms) where.bedrooms = req.query.bedrooms;
    if (req.query.property_type) where.property_type = req.query.property_type;
    if (req.query.is_available !== undefined) where.is_available = req.query.is_available;
    // Add more filters as needed
    const properties = await Property.findAll({ where });
    
    // Debug: Log the first property's images to see the structure
    if (properties.length > 0) {
      console.log('First property images:', properties[0].images);
      console.log('Type of images:', typeof properties[0].images);
      console.log('Is array?', Array.isArray(properties[0].images));
    }
    
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: err.message });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch property', error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user || user.role !== 'landlord') {
    return res.status(403).json({ message: 'Only landlords can update properties.' });
  }
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.created_by !== user.id) {
      return res.status(403).json({ message: 'You can only update your own properties.' });
    }
    await property.update(req.body);
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update property', error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  const user = getUserFromReq(req);
  if (!user || user.role !== 'landlord') {
    return res.status(403).json({ message: 'Only landlords can delete properties.' });
  }
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.created_by !== user.id) {
      return res.status(403).json({ message: 'You can only delete your own properties.' });
    }
    await property.destroy();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete property', error: err.message });
  }
}; 