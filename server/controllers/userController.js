const prisma = require('../config/db');

const getUsers = async (req, res) => {
  // TODO: Implement Admin Get Users logic
  res.json({ message: 'Get Users not implemented yet' });
};

const registerUser = async (req, res) => {
  // TODO: Implement User Registration
  res.status(201).json({ message: 'Register User not implemented yet' });
};

module.exports = {
  getUsers,
  registerUser,
};
