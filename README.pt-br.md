# 📦 Sistema de Gerenciamento de Inventário [![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)]()

Uma aplicação CRUD full-stack construída com Node.js, Express e PostgreSQL. Este projeto foi desenvolvido como parte do curso de NodeJS para praticar relações de banco de dados e renderização no lado do servidor com EJS.

# 🌐 Deploy (Hospedagem)

- Backend: Node.js/Express hosted on Render (Free Tier).
- Database: PostgreSQL hosted on Neon platform.
- **This project is on a free server that hibernates during inactivity. Please be patient for about a minute while it boots up**

# 🚀 Demonstração ao Vivo

Você pode explorar a aplicação no link 👉 [🔥 Live Demo]()

# 📸 Visualização

Home pagina:
![image.alt]()

Categorias pagina:
![image.alt]()

Detalhes Categoria pagina:
![image.alt]()

Criar Categoria pagina:
![image.alt]()

Categoria Editar pagina:
![image.alt]()

pagina Produtos:
![image.alt]()

pagina Produto detalhes :
![image.alt]()

criar produto pagina:
![image.alt]()

Editar produto pagina:
![image.alt]()

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
