const menuService = require('../services/menuService');

async function list(req, res, next) {
  try {
    const menu = await menuService.getAllMenu();
    res.json({ success: true, data: menu });
  } catch (e) { next(e); }
}

async function getById(req, res, next) {
  try {
    const item = await menuService.getMenuItemById(Number(req.params.id));
    if (!item) return res.status(404).json({ success: false, message: 'Блюдо не найдено' });
    res.json({ success: true, data: item });
  } catch (e) { next(e); }
}

module.exports = { list, getById };