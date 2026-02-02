const { Router } = require('express');
const catControler = require('../controllers/categoriesControler');
const router = Router();

router.get('/', catControler.getAllCategories);

module.exports = router;
