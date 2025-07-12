const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inquiry = sequelize.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  listing_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tenant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  landlord_response: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'viewed', 'responded'),
    defaultValue: 'pending',
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'inquiries',
  timestamps: false,
});

module.exports = Inquiry; 