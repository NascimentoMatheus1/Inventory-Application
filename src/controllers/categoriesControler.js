const db = require('../db/queries');

const getAllCategories = async (req, res) => {
    try {
        const categories = await db.getAllCategories();
        res.render('categories', { categories: categories });
    } catch (error) {
        console.log(error.message);
        res.render('error');
    }
};

module.exports = {
    getAllCategories,
};
