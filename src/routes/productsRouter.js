const productsControler = require('../controllers/productsControler');
const { Router } = require('express');
const router = Router();

router.get('/', productsControler.getAllProducts);
router.get('/:id', productsControler.getProduct);

module.exports = router;
