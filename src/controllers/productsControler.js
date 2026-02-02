const db = require('../db/queries');

const getAllProducts = async (req, res) => {
    try {
        const products = await db.getAllProducts();
        res.render('products', { products: products });
    } catch (error) {
        console.log(error.message);
        res.render('error');
    }
};

module.exports = {
    getAllProducts,
};
