function validateOrder(req, res, next) {
  const { name, phone, items } = req.body || {};
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Укажите имя' });
  }
  if (!phone || !/^\+?\d[\d\s\-()]{8,16}$/.test(phone)) {
    return res.status(400).json({ success: false, message: 'Некорректный телефон' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Корзина пуста' });
  }
  next();
}
module.exports = { validateOrder };