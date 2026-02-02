const { Router } = require('express');
const catControler = require('../controllers/categoriesControler');
const router = Router();

router.get('/', catControler.getAllCategories);
router.get('/new', catControler.getNewCategorie);
router.post('/add', catControler.postNewCategorie);
router.use(catControler.getErrorPage);

module.exports = router;
