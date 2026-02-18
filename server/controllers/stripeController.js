const stripe = require('../utils/stripe');
const prisma = require('../config/db');

const createCheckoutSession = async (req, res) => {
  const { items, userId, email, shippingAddress } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd', // Adjust to nzd if needed
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/shop`,
      customer_email: email,
      metadata: {
        userId: userId || null,
        shippingAddress: JSON.stringify(shippingAddress) || '',
        items: JSON.stringify(items.map(i => ({ id: i.id, quantity: i.quantity || 1 })))
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // req.rawBody is needed here. Ensure express is configured to verify signature.
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Fulfill the order
    try {
      await fulfillOrder(session);
    } catch (err) {
      console.error('Error fulfilling order:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  res.json({ received: true });
};

const fulfillOrder = async (session) => {
  const { metadata, amount_total, payment_status, customer_details } = session;
  const items = JSON.parse(metadata.items);
  const userId = metadata.userId ? parseInt(metadata.userId) : null;
  
  // Create Order in DB
  const order = await prisma.order.create({
    data: {
      userId: userId, // Can be null for guest checkout
      totalAmount: amount_total / 100,
      paymentStatus: payment_status,
      shippingAddress: metadata.shippingAddress || JSON.stringify(customer_details.address),
      isDelivered: false,
      orderItems: {
        create: items.map(item => ({
          productId: parseInt(item.id),
          quantity: item.quantity
        }))
      }
    }
  });

  console.log(`Order ${order.id} created successfully for ${customer_details.email}`);
  
  // Update Stock
  for (const item of items) {
     await prisma.product.update({
       where: { id: parseInt(item.id) },
       data: {
         soldCount: { increment: item.quantity },
         stock: { decrement: item.quantity }
       }
     });
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook,
};
