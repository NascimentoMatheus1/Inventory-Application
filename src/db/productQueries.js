const pool = require('./pool');

async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products;');
    return rows;
}

async function getAllCategories() {
    const { rows } = await pool.query(
        `SELECT distinct categories.name FROM categories
        LEFT JOIN products 
        ON (categories.id = products.categorie_id);`,
    );
    return rows;
}

module.exports = {
    getAllProducts,
    getAllCategories,
};
