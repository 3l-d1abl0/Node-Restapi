const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//import Models
const Product = require('../models/product');

router.get('/',(req, res, next)=>{

  Product.find()
    .exec()
    .then(docs=>{
      console.log(docs);
      console.log(docs.length);

      if(docs.length >0){
        res.status(200).json(docs);
      }else{
        res.status(404).json({
          message: "No entries Found !"
        });
      }


    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

router.post('/',(req, res, next)=>{
  /*
  const product = {
      name : req.body.name,
      price: req.body.price
  };*/

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
          message :  "Handling POST on /products",
          createdProduct: product
        });
     })
   .catch(err=> {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });


});

router.get('/:productId',(req, res, next)=>{
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json(doc);
      }else{
        res.status(404).json({message: "No valid Entry !"});
      }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
    });

  /*
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
  } */
});

//Update a Product
router.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId;

    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.update({ _id: id}, {$set: updateOps })
      .exec()
      .then(result=>{
        console.log(result);
        res.status(200).json(result);
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    //Product.update({ _id: id}, {$set: {name: req.body.newName, price: req.body.newPrice} });

    /*res.status(201).json({
      message :  "Product Updated !"
    });*/
});



//Handles Delete request
router.delete('/:productId',(req, res, next)=>{

    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=>{
      res.status(200).json(result);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

    /*
    res.status(201).json({
      message :  "Product Deleted !"
    });
    */
});

module.exports = router;
