require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');

const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Безопасность
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Статика
app.use(express.static(path.join(__dirname, '..', 'public')));

// API
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Обработчик ошибок (всегда последний)
app.use(errorHandler);

// Глобальные страховки от падений
process.on('unhandledRejection', (reason) => {
  console.error('UnhandledRejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('UncaughtException:', err);
});

const server = app.listen(PORT, () => {
  console.log(`☕ «Весёлые Посиделки» запущены на порту ${PORT}`);
});

// graceful shutdown
process.on('SIGTERM', () => server.close(() => process.exit(0)));