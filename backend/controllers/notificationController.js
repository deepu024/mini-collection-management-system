
const getNotifications = async (req, res, next) => {
    try {
      return res.json({ notifications: [] });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    getNotifications,
  };
  