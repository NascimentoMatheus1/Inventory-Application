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
    ('Noise Cancelling Headphones', 299.99, 30, 'Wireless over-ear headphones with 40h battery.', 1),
    ('Ultrawide Monitor', 450.00, 12, '34-inch curved display, 144Hz refresh rate.', 1),
    ('MacBook Air M2', 1099.00, 15, 'Thinnest laptop with 8-core CPU and GPU.', 1),
    ('Wireless Gaming Mouse', 75.00, 45, 'Ultra-lightweight with 25k DPI sensor.', 1),
    ('Monitor Mount Arm', 85.50, 20, 'Heavy-duty gas spring arm for 17-32 inch screens.', 2),
    ('LED Desk Lamp', 45.00, 60, 'Dimmable light with USB charging port.', 2),
    ('Laptop Stand', 35.00, 100, 'Aluminum foldable stand for improved posture.', 2),
    ('Set of Gel Pens', 12.99, 150, '12-pack of smooth-writing 0.5mm black ink pens.', 3),
    ('Weekly Planner', 22.00, 80, 'Undated spiral-bound planner with goal tracking.', 3),
    ('Desk Mat', 25.00, 40, 'Large felt protector for keyboard and mouse.', 3);
`;

async function main() {
    console.log('sending...');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done !');
}

main();
