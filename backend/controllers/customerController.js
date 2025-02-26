const prisma = require('../config/prisma');
const ExcelJS = require('exceljs');
const { log } = require('../utils/logger');

async function createCustomer(req, res, next) {
  try {
    const { name, contactInfo, outstandingAmount, paymentDueDate, paymentStatus } = req.body;

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        contactInfo,
        outstandingAmount,
        paymentDueDate: paymentDueDate ? new Date(paymentDueDate) : undefined,
        paymentStatus,
      },
    });
    
    log(`New customer added: ${newCustomer.name}`);

    global.io.emit('newCustomer', {
      id: newCustomer.id,
      name: newCustomer.name,
      message: `New customer added: ${newCustomer.name}`,
    });

    return res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
}


const getAllCustomers = async (req, res, next) => {
  try {
    // Optional: implement filtering/sorting from query params
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

const getCustomer = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const customer = await prisma.customer.findUnique({ where: { id } });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

async function updateCustomer(req, res, next) {
  try {
    const id = Number(req.params.id);
    const {
      name,
      contactInfo,
      outstandingAmount,
      paymentDueDate,
      paymentStatus,
    } = req.body;

    const updated = await prisma.customer.update({
      where: { id },
      data: {
        name,
        contactInfo,
        outstandingAmount: parseFloat(outstandingAmount),
        paymentDueDate: paymentDueDate ? new Date(paymentDueDate) : undefined,
        paymentStatus,
      },
    });

    log(`Customer updated: ${updated.name}`);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
}


const deleteCustomer = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.customer.delete({ where: { id } });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    next(err);
  }
};

const bulkUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    const worksheet = workbook.worksheets[0]; // use the first worksheet

    let successCount = 0;
    let errorCount = 0;

    // Assume row 1 is header; start from row 2
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const name = row.getCell(1).value;
      const contactInfo = row.getCell(2).value;
      const amount = parseFloat(row.getCell(3).value || 0);
      const dueDateRaw = row.getCell(4).value;
      const paymentStatus = row.getCell(5).value || 'PENDING';

      // Convert date if it exists
      let paymentDueDate = null;
      if (dueDateRaw) {
        // handle if it's a date or string
        paymentDueDate = new Date(dueDateRaw);
      }

      try {
        await prisma.customer.create({
          data: {
            name: String(name || '').trim(),
            contactInfo: String(contactInfo || ''),
            outstandingAmount: amount,
            paymentDueDate,
            paymentStatus: String(paymentStatus),
          },
        });
        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    return res.json({
      message: 'Import completed',
      successCount,
      errorCount,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  bulkUpload,
};
