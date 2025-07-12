//Local DB connection
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// module.exports = sequelize; 

//Remote DB connection (Railway MySQL)
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: { // Required for Railway MySQL
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false // Disable logging in production
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection failed:', err));

module.exports = sequelize;