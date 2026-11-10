const fs = require('fs').promises;
const path = require('path');
const MENU_PATH = path.join(__dirname, '..', 'data', 'menu.json');

async function getAllMenu() {
  const raw = await fs.readFile(MENU_PATH, 'utf8');
  return JSON.parse(raw);
}

async function getMenuItemById(id) {
  const menu = await getAllMenu();
  return menu.find((item) => item.id === id) || null;
}

module.exports = { getAllMenu, getMenuItemById };