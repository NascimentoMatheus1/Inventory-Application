const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories;');
    return rows;
}

async function getCategoryByID(id) {
    const { rows } = await pool.query(
        'SELECT * FROM categories WHERE id = ($1)',
        [id],
    );
    return rows[0];
}

async function deleteCategoryByID(id) {
    const { rows } = await pool.query(
        'DELETE FROM categories WHERE id = ($1)',
        [id],
    );
    return rows[0];
}

async function getCategoryByName(name) {
    const { rows } = await pool.query(
        'SELECT * FROM categories WHERE name = ($1)',
        [name],
    );
    return rows[0];
}

async function addCategorie(name, description) {
    const { rows } = await pool.query(
        `INSERT INTO categories (name, description) VALUES (($1), ($2))`,
        [name, description],
    );
    return rows;
}

async function getAllProductsFromCategory(id) {
    const { rows } = await pool.query(
        `SELECT products.name FROM categories
        INNER JOIN products 
        ON (categories.id = products.categorie_id)
        WHERE categories.id = ($1);`,
        [id],
    );
    return rows;
}

async function updateCategory(name, description, id) {
    const { rows } = await pool.query(
        `UPDATE categories SET name = ($1), description = ($2) WHERE id = ($3) RETURNING *`,
        [name, description, id],
    );
    return rows[0];
}

module.exports = {
    getAllCategories,
    getCategoryByName,
    getCategoryByID,
    addCategorie,
    deleteCategoryByID,
    getAllProductsFromCategory,
    updateCategory,
};
