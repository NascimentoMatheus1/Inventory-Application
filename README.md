# 📦 Inventory Management System [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/README.pt-br.md)

A full-stack CRUD application built with Node.js, Express, and PostgreSQL. This project was developed as part of the NodeJS course to practice database relations and server-side rendering with EJS.

# 🌐 Deployment

- Backend: Node.js/Express hosted on Render (Free Tier).
- Database: PostgreSQL hosted on Neon platform.
- **This project is on a free server that hibernates during inactivity. Please be patient for about a minute while it boots up**

# 🚀Live Demo:

You can explore the live application at the link this link 👉 [🔥 Live Demo](https://inventory-application-68mm.onrender.com)

# 📸 Preview

Home page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/home-page.png)

Categories page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/categories-page.png)

Category Detail page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-details-page.png)

Category Create page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-create-page.png)

Category Edit page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-edit-page.png)

Products page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-page.png)

Product Detail page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-details-page.png)

Product Add page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-add-page.png)

Product Update page:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-update-page.png)

# 🛠 Features

- Full CRUD: Create, Read, Update, and Delete both Categories and Products.
- Relational Database: Items are linked to specific categories with Foreign Key constraints.
- Dynamic UI: View all categories or filter items by a specific category.
- State Persistence: Filters and sort orders are maintained across page reloads.
- Data Integrity: Custom logic handles what happens to items when a category is deleted.

# 🛠️ Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL
- Frontend: EJS (Embedded JavaScript Templates), CSS3

# 📂 Database Schema

The application uses two main entities with a One-to-Many relationship: one category can contain multiple products.

Tables:
- Categories: id, name, description.
- Products: id, name, description, sale_price, current_stock, category_id.

# 💻 Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL (using pg pool)
- View Engine: EJS (Embedded JavaScript)
- Styling: CSS3
