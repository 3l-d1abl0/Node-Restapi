const express  = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) =>{
  console.log(req.url);
  res.status(200).json({
    message: "Working !"
  });
});

module.exports = app;
