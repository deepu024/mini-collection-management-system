const prisma = require('../config/prisma');

async function updatePaymentStatus(req, res, next) {
  try {
    const { customerId, status } = req.body;

    // update DB
    const updated = await prisma.customer.update({
      where: { id: Number(customerId) },
      data: { paymentStatus: status },
    });

    // Real-time event name depends on your preference:
    // If "status" is COMPLETED => "paymentReceived"
    // If "status" is OVERDUE => "paymentOverdue"
    // Or you can unify them under "paymentStatusUpdated".
    if (status === 'COMPLETED') {
      global.io.emit('paymentReceived', {
        customerId: updated.id,
        message: `Payment received for #${updated.id}`,
      });
    } else if (status === 'OVERDUE') {
      global.io.emit('paymentOverdue', {
        customerId: updated.id,
        message: `Payment overdue for #${updated.id}`,
      });
    } else {
      // fallback
      global.io.emit('paymentStatusUpdated', {
        customerId: updated.id,
        status,
        message: `Payment status updated to ${status} for #${updated.id}`,
      });
    }

    return res.json({ message: 'Payment status updated', updated });
  } catch (error) {
    next(error);
  }
}


module.exports = { updatePaymentStatus };
