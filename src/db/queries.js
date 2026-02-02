const pool = require('./pool');

async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products;');
    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories;');
    return rows;
}

module.exports = {
    getAllProducts,
    getAllCategories,
};
