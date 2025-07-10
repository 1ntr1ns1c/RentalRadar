const User = require('./User');
const Property = require('./Property');
const Inquiry = require('./Inquiry');

// Associations
Property.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Inquiry.belongsTo(Property, { foreignKey: 'listing_id', as: 'property' });
Inquiry.belongsTo(User, { foreignKey: 'tenant_id', as: 'tenant' });

module.exports = {
  User,
  Property,
  Inquiry,
}; 