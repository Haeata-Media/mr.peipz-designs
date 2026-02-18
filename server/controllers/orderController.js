const prisma = require('../config/db');

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } },
        orderItems: { include: { product: true } },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true, email: true } },
        orderItems: { include: { product: true } },
      },
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        paymentStatus: 'paid',
        paidAt: new Date(),
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
        status: 'delivered', // assuming status field exists or using isDelivered
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addOrderItems = async (req, res) => {
  // Logic to be implemented with Stripe webhook mainly
  res.status(201).json({ message: 'Order creation handled via Webhook in future' });
};

module.exports = {
  addOrderItems,
  getOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
