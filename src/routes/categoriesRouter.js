const { Router } = require('express');
const categories = require('../controllers/categoriesControler');
const router = Router();

router.get('/', categories.getAllCategories);
router.get('/new', categories.getNewCategorie);
router.get('/:id', categories.getCategory);
router.get('/update/:id', categories.getEditCategorie);
router.post('/edit/:id', categories.postEditCategory);
router.post('/add', categories.postNewCategorie);
router.get('/delete/:id', categories.deleteCategory);
router.use(categories.getErrorPage);

module.exports = router;
