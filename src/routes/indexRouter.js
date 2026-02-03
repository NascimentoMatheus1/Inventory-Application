const { Router } = require('express');
const index = require('../controllers/indexControler');
const router = Router();

router.get('/', index.getHomepage);

module.exports = router;
