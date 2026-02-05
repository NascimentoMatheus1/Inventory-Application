# 📦 Sistema de Gerenciamento de Inventário [![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/NascimentoMatheus1/Inventory-Application/blob/65add97a60154fd8fa11d5236df6866f7a5c16f8/README.md)

Uma aplicação CRUD full-stack construída com Node.js, Express e PostgreSQL. Este projeto foi desenvolvido como parte do curso de NodeJS para praticar relações de banco de dados e renderização no lado do servidor com EJS.

# 🌐 Deploy (Hospedagem)
- Backend: Node.js/Express hospedado no Render (Plano Gratuito).
- Banco de Dados: PostgreSQL hospedado na plataforma Neon.
- **Nota: Este projeto está em um servidor gratuito que "hiberna" após períodos de inatividade. Por favor, aguarde cerca de um minuto para o carregamento inicial enquanto o servidor desperta**

# 🚀 Demonstração ao Vivo

Você pode explorar a aplicação no link 👉 [🔥 Live Demo](https://inventory-application-68mm.onrender.com)

# 📸 Visualização

Home pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/home-page.png)

Categorias pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/categories-page.png)

Detalhes Categoria pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-details-page.png)

Criar Categoria pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-create-page.png)

Categoria Editar pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/category-edit-page.png)

Pagina Produtos:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-page.png)

Pagina Produto detalhes :
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-details-page.png)

Adicionar produto pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-add-page.png)

Atualizar produto pagina:
![image.alt](https://github.com/NascimentoMatheus1/Inventory-Application/blob/548a64bc4a795a43de3359f54dc6520fd8a768d3/readme_images/products-update-page.png)

# 🛠 Funcionalidades

- CRUD Completo: Crie, visualize, atualize e delete tanto Categorias quanto Produtos.
- Banco de Dados Relacional: Itens estão vinculados a categorias específicas através de restrições de Foreign Key (Chave Estrangeira).
- Interface Dinâmica: Visualize todas as categorias ou filtre itens por uma categoria específica.
- Persistência de Estado: Filtros e ordens de classificação são mantidos mesmo após o recarregamento da página.
- Integridade de Dados: Lógica customizada para lidar com o que acontece com os itens quando uma categoria é excluída.

# 📂 Esquema do Banco de Dados

A aplicação utiliza duas entidades principais com uma relação Um-para-Muitos: uma categoria pode conter vários produtos.

Tabelas:

- Categories (Categorias): id, name, description.
- Products (Produtos): id, name, description, sale_price, current_stock, categorie_id.

# 💻 Tech Stack (Tecnologias)

- Backend: Node.js, Express.js
- Banco de Dados: PostgreSQL (usando pool do pg)
- View Engine: EJS (Embedded JavaScript)
- Estilização: CSS3 (Estilos customizados)
