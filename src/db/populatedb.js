const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT
    );

    INSERT INTO categories (name, description) VALUES 
        ('Electronics', 'Gadgets, devices, and tech accessories.'),
        ('Furniture', 'Office and home furniture items.'),
        ('Stationery', 'Writing materials and organizational supplies.');


    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        sale_price DECIMAL(10, 2),
        current_stock INT DEFAULT 0,
        description TEXT,
        categorie_id INT REFERENCES categories(id)
    );

    INSERT INTO products (name, sale_price, current_stock, description, categorie_id) VALUES 
        ('iPhone 15 Pro', 999.00, 25, 'Apple smartphone with Titanium finish.', 1),
        ('Mechanical Keyboard', 120.50, 50, 'RGB backlit with Brown switches.', 1),
        ('Ergonomic Chair', 350.00, 10, 'High-back mesh chair with lumbar support.', 2),
        ('Standing Desk', 499.00, 7, 'Electric height-adjustable desk.', 2),
        ('Hardcover Journal', 15.00, 200, 'A5 sized, 160 pages, dotted paper.', 3);
`;

async function main() {
    console.log('sending...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done !');
}

main();
