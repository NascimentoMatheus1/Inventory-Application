const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    CREATE TABLE IF NOT EXISTS categories(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT
    );

    INSERT INTO categories (name, description) VALUES 
    ('Electronics', 'Gadgets, hardware, and tech accessories.'),
    ('Fashion', 'Clothing, footwear, and style accessories.'),
    ('Groceries', 'Food, beverages, and household consumables.'),
    ('Home & Decor', 'Furniture, lighting, and interior decorations.'),
    ('Books', 'Physical books, e-books, and educational materials.');


    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        sale_price DECIMAL(10, 2),
        current_stock INT DEFAULT 0,
        description TEXT,
        categorie_id INT REFERENCES categories(id)
    );

    INSERT INTO products (name, sale_price, current_stock, description, categorie_id) VALUES
    -- Category 1: Electronics
    ('Smartphone Pro', 899.99, 25, 'High-end smartphone with OLED display.', 1),
    ('Wireless Headphones', 149.50, 50, 'Noise-canceling over-ear headphones.', 1),
    ('Mechanical Keyboard', 89.00, 15, 'RGB backlit mechanical gaming keyboard.', 1),

    -- Category 2: Fashion
    ('Cotton T-Shirt', 19.99, 100, '100% organic cotton basic white tee.', 2),
    ('Denim Jacket', 55.00, 30, 'Classic blue denim jacket with slim fit.', 2),
    ('Running Shoes', 75.25, 45, 'Lightweight breathable mesh sneakers.', 2),

    -- Category 3: Groceries
    ('Organic Coffee Beans', 15.90, 80, '500g Arabica dark roast coffee.', 3),
    ('Extra Virgin Olive Oil', 12.50, 40, 'Cold-pressed 750ml olive oil.', 3),
    ('Pasta Linguine', 3.49, 200, 'Traditional Italian durum wheat pasta.', 3),

    -- Category 4: Home & Decor
    ('Ceramic Table Lamp', 42.00, 12, 'Minimalist ceramic lamp with linen shade.', 4),
    ('Memory Foam Pillow', 29.99, 60, 'Orthopedic support memory foam pillow.', 4),
    ('Wall Clock', 18.00, 20, 'Silent sweep non-ticking modern clock.', 4),

    -- Category 5: Books
    ('The Great Gatsby', 14.99, 10, 'F. Scott Fitzgerald classic novel.', 5),
    ('Clean Code', 38.50, 5, 'A Handbook of Agile Software Craftsmanship.', 5),
    ('Recipe Journal', 12.00, 25, 'Blank notebook for your favorite recipes.', 5);
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
