const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

//create
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
const updateProduct = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    !product && res.status(404).json("Product is not found with this id");

    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(err);
  }
});

//get All Products
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    !product && res.status(404).json("Product is not found with this id");
    await product.remove();
    res.status(200).json("Product deleted succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//create or update  review
const addorUpdateReview = asyncHandler(async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = {
    userId: req.user._id,
    name: req.user.name,
    rating: rating,
    comment,
  };

  try {
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.userId.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.userId.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
    }

    await product.save({ validateBeforeSave: false });

    res.status(200).json("updated succesfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//get reviews of simgle product
const getReviews = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product.reviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete reviews --admin
const deleteReview = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter((rev) => rev._id !== req.params.id);

    if (reviews.length === 0) {
      rating = 0;
    } else {
      rating = reviews.reduce((a, c) => c.rating + a, 0) / reviews.length;
    }
    const numReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      rating,
      numReviews,
    }, { new: true });
      
      res.status(200).json("succesfull");
  } catch (error) {
      res.status(500).json(error);
  }
});

//get products categories
const getProductsCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Product.find().distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  addorUpdateReview,
  getReviews,
  deleteReview,
  getProductsCategories,
};
