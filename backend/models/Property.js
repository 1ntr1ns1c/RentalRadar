const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neighbourhood: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('images');
      if (rawValue === null || rawValue === undefined) {
        return [];
      }
      // If it's already an array, return it
      if (Array.isArray(rawValue)) {
        return rawValue;
      }
      // If it's a string, try to parse it
      if (typeof rawValue === 'string') {
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          console.error('Failed to parse images JSON:', e);
          return [];
        }
      }
      // If it's an object, convert to array
      if (typeof rawValue === 'object') {
        return Object.values(rawValue);
      }
      return [];
    },
    set(value) {
      // Ensure we always store an array
      if (Array.isArray(value)) {
        this.setDataValue('images', value);
      } else if (value === null || value === undefined) {
        this.setDataValue('images', []);
      } else {
        this.setDataValue('images', [value]);
      }
    }
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  property_type: {
    type: DataTypes.ENUM('apartment', 'house', 'condo', 'studio', 'bedsitter', 'single'),
    allowNull: false,
  },
}, {
  tableName: 'properties',
  timestamps: false,
});

module.exports = Property; 