const prisma = require('../config/prisma');

const updatePaymentStatus = async (req, res, next) => {
  try {
    const { customerId, status } = req.body;

    const updated = await prisma.customer.update({
      where: { id: Number(customerId) },
      data: { paymentStatus: status },
    });

    // Emit WebSocket event
    global.io.emit('paymentStatusUpdated', {
      customerId: updated.id,
      status: updated.paymentStatus,
    });

    res.json({ message: 'Payment status updated', updated });
  } catch (err) {
    next(err);
  }
};

module.exports = { updatePaymentStatus };
