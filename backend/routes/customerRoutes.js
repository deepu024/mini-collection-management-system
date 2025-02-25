const router = require('express').Router();
const multer = require('multer');
const upload = multer();
const {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  bulkUpload,
} = require('../controllers/customerController');

// CRUD
router.post('/', createCustomer);
router.get('/', getAllCustomers);
router.get('/:id', getCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

// Bulk upload
router.post('/bulk-upload', upload.single('file'), bulkUpload);

module.exports = router;
