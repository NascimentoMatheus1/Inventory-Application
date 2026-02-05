const pool = require('./pool');

async function getAllProducts() {
    const { rows } = await pool.query('SELECT * FROM products;');
    return rows;
}

async function getProductInfoByID(id) {
    const { rows } = await pool.query(
        `SELECT distinct 
        p.id, p.name, p.description, p.current_stock, p.sale_price, 
        c.id as category_id, c.name as category 
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
        `SELECT distinct categories.name, categories.id FROM categories
        LEFT JOIN products 
        ON (categories.id = products.categorie_id);`,
    );
    return rows;
}

async function addProduct(
    name,
    sale_price,
    current_stock,
    description,
    category_id,
) {
    const { rows } = await pool.query(
        `INSERT INTO products (name, sale_price, current_stock, description, categorie_id)
            VALUES (($1), ($2), ($3), ($4), ($5)) RETURNING *
        `,
        [name, sale_price, current_stock, description, category_id],
    );
    return rows[0];
}

async function updateProduct(
    name,
    sale_price,
    current_stock,
    description,
    category_id,
    id,
) {
    const { rows } = await pool.query(
        `UPDATE products SET name = ($1), sale_price = ($2), 
        current_stock = ($3), description = ($4), categorie_id = ($5)
        WHERE id = ($6) RETURNING *;
        `,
        [name, sale_price, current_stock, description, category_id, id],
    );
    return rows[0];
}

async function deleteProductByID(id) {
    const { rows } = await pool.query(`DELETE FROM products WHERE id = ($1);`, [
        id,
    ]);
}

async function filterAndSortProducts(category, sort) {
    const { rows } = await pool.query(
        `
            SELECT products.id, products.name, products.sale_price, products.current_stock from products 
            LEFT JOIN categories 
            ON (products.categorie_id=categories.id)
            WHERE categories.name LIKE $1
            ORDER BY ${sort};
        `,
        [category],
    );
    return rows;
}

module.exports = {
    getAllProducts,
    getAllCategories,
    getProductInfoByID,
    addProduct,
    deleteProductByID,
    updateProduct,
    filterAndSortProducts,
};
