const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phone: DataTypes.STRING,
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: false
  },
  membershipType: {
    type: DataTypes.ENUM('Bronze', 'Silver', 'Gold'),
    allowNull: false
  },
}, {
  tableName: 'members',
  timestamps: true,
});

module.exports = Member;
