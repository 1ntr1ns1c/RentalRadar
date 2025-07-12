const { Inquiry, User, Property } = require('../models');

exports.sendInquiry = async (req, res) => {
  try {
    const { listing_id, message } = req.body;
    const tenant_id = req.user.id;

    if (!listing_id || !message) {
      return res.status(400).json({ message: 'Listing ID and message are required.' });
    }

    // Check if property exists
    const property = await Property.findByPk(listing_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    const inquiry = await Inquiry.create({
      listing_id,
      tenant_id,
      message,
      status: 'pending'
    });

    res.status(201).json({
      id: inquiry.id,
      listing_id: inquiry.listing_id,
      message: inquiry.message,
      status: inquiry.status,
      created_at: inquiry.created_at
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send inquiry', error: err.message });
  }
};

exports.getInquiries = async (req, res) => {
  try {
    const user = req.user;
    let inquiries;

    if (user.role === 'landlord') {
      // Get inquiries for properties owned by the landlord
      const properties = await Property.findAll({ where: { created_by: user.id } });
      const propertyIds = properties.map(p => p.id);
      
      // If landlord has no properties, return empty array
      if (propertyIds.length === 0) {
        inquiries = [];
      } else {
        inquiries = await Inquiry.findAll({
          where: { listing_id: propertyIds },
          include: [
            {
              model: User,
              as: 'tenant',
              attributes: ['id', 'name', 'email']
            },
            {
              model: Property,
              as: 'property',
              attributes: ['id', 'title', 'city', 'neighbourhood']
            }
          ],
          order: [['created_at', 'DESC']]
        });
      }
    } else {
      // Get inquiries sent by the tenant
      inquiries = await Inquiry.findAll({
        where: { tenant_id: user.id },
        include: [
          {
            model: Property,
            as: 'property',
            attributes: ['id', 'title', 'city', 'neighbourhood']
          }
        ],
        order: [['created_at', 'DESC']]
      });
    }

    res.json(inquiries);
  } catch (err) {
    console.error('Error in getInquiries:', err);
    res.status(500).json({ message: 'Failed to get inquiries', error: err.message });
  }
};

exports.respondToInquiry = async (req, res) => {
  try {
    const { inquiry_id } = req.params;
    const { response } = req.body;
    const user = req.user;

    if (user.role !== 'landlord') {
      return res.status(403).json({ message: 'Only landlords can respond to inquiries.' });
    }

    if (!response) {
      return res.status(400).json({ message: 'Response message is required.' });
    }

    const inquiry = await Inquiry.findByPk(inquiry_id, {
      include: [
        {
          model: Property,
          as: 'property',
          where: { created_by: user.id }
        }
      ]
    });

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found or not authorized.' });
    }

    inquiry.status = 'responded';
    inquiry.landlord_response = response;
    await inquiry.save();

    res.json({ message: 'Response sent successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to respond to inquiry', error: err.message });
  }
}; 