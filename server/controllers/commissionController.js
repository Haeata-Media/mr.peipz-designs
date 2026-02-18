const prisma = require('../config/db');

const getCommissions = async (req, res) => {
  try {
    const commissions = await prisma.commission.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(commissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const commission = await prisma.commission.findUnique({
      where: { id: parseInt(id) },
    });
    if (!commission) return res.status(404).json({ message: 'Commission not found' });
    res.json(commission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCommission = async (req, res) => {
  try {
    const { name, email, budget, description } = req.body;
    const commission = await prisma.commission.create({
      data: {
        clientName: name,
        email,
        budgetRange: budget,
        description,
        status: 'pending',
      },
    });

    // Send Receipt Email
    const { sendEmail } = require('../utils/email');
    await sendEmail({
      to: email,
      subject: 'Commission Request Received',
      html: `
        <h1>Request Received</h1>
        <p>Hi ${name},</p>
        <p>Thank you for submitting a commission request. We have received your details and will review them shortly.</p>
        <p><strong>Description:</strong> ${description}</p>
        <p>We will be in touch soon!</p>
      `,
    });

    res.status(201).json(commission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCommissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, depositPaid, finalPaid } = req.body;
    
    const commission = await prisma.commission.update({
      where: { id: parseInt(id) },
      data: {
        status,
        depositPaid,
        finalPaid,
      },
    });
    
    res.json(commission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCommission,
  getCommissions,
};
