function send(req, res, next) {
  try {
    const { name, message } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Заполните все поля' });
    }
    console.log(`📩 Сообщение от ${name}: ${message}`);
    res.json({ success: true, message: 'Спасибо! Мы скоро свяжемся.' });
  } catch (e) { next(e); }
}
module.exports = { send };