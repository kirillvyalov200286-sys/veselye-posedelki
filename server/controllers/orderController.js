const orderService = require('../services/orderService');

function create(req, res, next) {
  try {
    const order = orderService.createOrder(req.body);
    res.status(201).json({ success: true, data: order });
  } catch (e) { next(e); }
}

function getById(req, res, next) {
  try {
    const order = orderService.getOrderById(Number(req.params.id));
    if (!order) return res.status(404).json({ success: false, message: 'Заказ не найден' });
    res.json({ success: true, data: order });
  } catch (e) { next(e); }
}

module.exports = { create, getById };