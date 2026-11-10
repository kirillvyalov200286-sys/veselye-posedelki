const orders = []; // в проде — БД (Postgres/Mongo)
let nextId = 1;

function createOrder({ name, phone, items, comment = '' }) {
  const order = {
    id: nextId++,
    name,
    phone,
    items,
    comment,
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  orders.push(order);
  return order;
}

function getOrderById(id) {
  return orders.find((o) => o.id === id) || null;
}

module.exports = { createOrder, getOrderById };