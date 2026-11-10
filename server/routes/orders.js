const router = require('express').Router();
const ctrl = require('../controllers/orderController');
const { validateOrder } = require('../middleware/validator');
router.post('/', validateOrder, ctrl.create);
router.get('/:id', ctrl.getById);
module.exports = router;