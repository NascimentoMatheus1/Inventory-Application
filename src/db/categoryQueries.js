const pool = require('./pool');

async function getAllCategories() {
    const { rows } = await pool.query('SELECT * FROM categories;');
    return rows;
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

module.exports = {
    getAllCategories,
    getCategoryByName,
    addCategorie,
};
