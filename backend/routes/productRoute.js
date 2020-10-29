const express = require('express');

const Product = require('../models/productModel');
const Review = require("../models/productModel");

const { isAuth, isAdmin } = require('../util');
const data = require("../data");
const cors = require("../middleware/cors")
const app = express();
app.use(express.json());
const router = express.Router();
/*
router.post("/",cors, async(req,res)=>{
  const product = new Product(req.body);
  console.log(product);
  try{
    await product.save();
    res.status(201).send(product);
    console.log(product);  
  }
  catch(err){
    console.log("Can't add product");
    res.status(400).send(err);
  }
})
*/
// added cors middleware
router.get('/', cors, async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: 'i',
        },
      }
    : {};
  const sortOrder = req.query.sortOrder
    ? req.query.sortOrder === 'lowest'
      ? { price: 1 }
      : { price: -1 }
    : { _id: -1 };

  // find() only returns first item found, and also takes a callback function as arg
  // here it made more sense to take filter than make adjustments to them with map()
  
  /*  const products = await Product.fi(product => product.category == category.category )    // ERROR CHANCE HERE
      .map( product => { return {...product, ...searchKeyword} } )
      .sort(
        sortOrder
      );
      */
      const products =  await Product.find({ ...category, ...searchKeyword }).sort( sortOrder );
      console.log(products)
      res.send(products);
    /*
    catch{
    console.log("Can't Find Product");
  } */
});

router.get('/:id',cors, async (req, res) => {
  const product =  await Product.findOne({_id:req.params.id});
  /*if (!product) {
    return;
  } */
  res.send(product);
  console.log(product);
  //} else {
   // console.log("Ooops Problem here.")
   // res.status(404).send({ message: 'Product Not Found.' });
  //}
});

router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully.',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Product Updated', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await new Product.findById(req.params.id);
  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: 'Product Deleted' });
  } else {
    res.send('Error in Deletion.');
  }
});

router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });
  const saveProduct = await product.save();
  if (saveProduct) {
    console.log(saveProduct);
    return res.status(201).send({ message: 'New Product Created', data: saveProduct });
  }
  return res.status(500).send({ message: ' Error in Creating Product.' });
});

module.exports= router;
