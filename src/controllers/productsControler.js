const db = require('../db/productQueries');

const getAllProducts = async (req, res) => {
    try {
        const products = await db.getAllProducts();
        const categories = await db.getAllCategories();
        res.render('products', { title: 'All products', products, categories });
    } catch (error) {
        console.log(error.message);
        res.render('error', { title: 'Error' });
    }
};

module.exports = {
    getAllProducts,
};
