const productsControler = require('../controllers/productsControler');
const { Router } = require('express');
const router = Router();

router.get('/new', productsControler.getNewForm);
router.get('/', productsControler.getAllProducts);
router.get('/:id', productsControler.getProduct);
router.post('/save', productsControler.postSaveProduct);
router.get('/delete/:id', productsControler.deleteProduct);

module.exports = router;
