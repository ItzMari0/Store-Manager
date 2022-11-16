const express = require('express');
const products = require('./routers/products.router');
const sales = require('./routers/sales.router');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 

app.use('/products', products);
app.use('/sales', sales);

module.exports = app;
