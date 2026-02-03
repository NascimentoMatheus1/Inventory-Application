const { Router } = require('express');
const categories = require('../controllers/categoriesControler');
const router = Router();

router.post('/add', categories.postNewCategorie);

router.get('/delete/:id', categories.deleteCategory);

router.get('/new', categories.getNewCategorie);
router.get('/', categories.getAllCategories);
router.get('/:id', categories.getCategory);
router.use(categories.getErrorPage);

module.exports = router;
