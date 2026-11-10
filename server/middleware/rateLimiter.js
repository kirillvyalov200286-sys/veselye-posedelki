const rateLimit = require('express-rate-limit');
module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Слишком много запросов, попробуйте позже' }
});