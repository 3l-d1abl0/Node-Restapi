const express = require('express');
const router = express.Router();

router.get('/',(req, res, next)=>{
  res.status(200).json({
    message :  "Handling GET on /products"
  });
});

router.post('/',(req, res, next)=>{

  const product = {
      name : req.body.name,
      price: req.body.price
  };

  res.status(201).json({
    message :  "Handling POST on /products",
    createdProduct: product
  });
});

router.get('/:productId',(req, res, next)=>{
  const id = req.params.productId;

  if(id>0){
    res.status(200).json({
      message :  "GET with ID",
      id: id
    });
  }else{
    res.status(200).json({
      message : "Something is Wrong with this Id",
      id: id
    });
  }
});

router.patch('/:productId',(req, res, next)=>{
    res.status(201).json({
      message :  "Product Updated !"
    });
});

router.delete('/:productId',(req, res, next)=>{
    res.status(201).json({
      message :  "Product Deleted !"
    });
});

module.exports = router;
