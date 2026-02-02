const { Router } = require('express');
const catControler = require('../controllers/categoriesControler');
const router = Router();

router.get('/new', catControler.getNewCategorie);
router.post('/add', catControler.postNewCategorie);
router.get('/', catControler.getAllCategories);
router.get('/:id', catControler.getCategory);
router.use(catControler.getErrorPage);

module.exports = router;
