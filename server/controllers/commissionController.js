const prisma = require('../config/db');

const createCommission = async (req, res) => {
  try {
    const { clientName, email, description, budgetRange } = req.body;
    const commission = await prisma.commission.create({
      data: {
        clientName,
        email,
        description,
        budgetRange,
      },
    });
    res.status(201).json(commission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommissions = async (req, res) => {
  // TODO: Implement Admin Get Commissions logic
  res.json({ message: 'Get Commissions not implemented yet' });
};

module.exports = {
  createCommission,
  getCommissions,
};
