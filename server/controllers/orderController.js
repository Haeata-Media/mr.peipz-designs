const prisma = require('../config/db');

const createOrder = async (req, res) => {
  // TODO: Implement Create Order logic
  res.status(201).json({ message: 'Create Order not implemented yet' });
};

const getOrders = async (req, res) => {
  // TODO: Implement Admin Get Orders logic
  res.json({ message: 'Get Orders not implemented yet' });
};

module.exports = {
  createOrder,
  getOrders,
};
