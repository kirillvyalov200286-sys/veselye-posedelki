const router = require('express').Router();
const ctrl = require('../controllers/contactController');
router.post('/', ctrl.send);
module.exports = router;