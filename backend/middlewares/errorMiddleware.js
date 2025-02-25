const { error } = require('../utils/logger');

module.exports = (err, req, res, next) => {
  error(err);
  return res.status(500).json({ error: err.message });
};
