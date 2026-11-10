const cart = [];

const $ = (sel) => document.querySelector(sel);

function money(n) { return `${n} ₽`; }

async function loadMenu() {
  const box = $('#menu-list');
  try {
    const res = await fetch('/api/menu');
    if (!res.ok) throw new Error('menu error');
    const { data } = await res.json();
    box.innerHTML = '';
    data.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card__name">${item.name}</div>
        <div class="card__desc">${item.description}</div>
        <div class="card__row">
          <span class="card__price">${money(item.price)}</span>
          <button data-id="${item.id}">В корзину</button>
        </div>`;
      card.querySelector('button').addEventListener('click', () => {
        cart.push({ id: item.id, name: item.name, price: item.price });
        renderCart();
      });
      box.appendChild(card);
    });
  } catch {
    box.textContent = 'Не удалось загрузить меню. Попробуйте позже.';
  }
}

function renderCart() {
  const box = $('#cart-summary');
  if (!cart.length) { box.textContent = 'Корзина пуста'; return; }
  const total = cart.reduce((s, i) => s + i.price, 0);
  box.textContent = `В корзине: ${cart.length} поз. · Итого ${money(total)}`;
}

$('#order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const status = $('#order-status');
  const btn = form.querySelector('button[type="submit"]');

  const payload = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    comment: form.comment.value.trim(),
    items: cart.map(({ id, name, price }) => ({ id, name, price }))
  };

  if (!payload.name || !payload.phone) {
    status.textContent = 'Заполните имя и телефон.';
    return;
  }
  if (!payload.items.length) {
    status.textContent = 'Добавьте что-нибудь из меню.';
    return;
  }

  btn.disabled = true;
  status.textContent = 'Отправляем…';
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || 'Ошибка');
    status.textContent = `Заказ №${json.data.id} принят! Мы позвоним.`;
    cart.length = 0;
    renderCart();
    form.reset();
  } catch (err) {
    status.textContent = `Не удалось отправить: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  loadMenu();
});