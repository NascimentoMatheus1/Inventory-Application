const pool = require('./pool');

async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products;');
    return rows;
}

async function getProductInfoByID(id) {
    const { rows } = await pool.query(
        `SELECT distinct p.name, p.description, p.current_stock, p.sale_price, c.name as category 
        FROM categories AS c
        LEFT JOIN products AS p 
        ON (c.id = p.categorie_id) 
        WHERE p.id = ($1);`,
        [id],
    );
    return rows[0];
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
    getProductInfoByID,
};
