const path = require('node:path');
const express = require('express');
const app = express();

const productsRouter = require('./routes/productsRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const indexRouter = require('./routes/indexRouter');

// view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// middlewares
const assetsPath = path.join(__dirname, '/public');
app.use(express.static(assetsPath));

// routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/', indexRouter);

module.exports = app;
