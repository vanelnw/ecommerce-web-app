const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  addorUpdateReview,
  getReviews,
  deleteReview,
  getProductsCategories,
} = require("../controllers/productController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuth } = require("../middlewares/isAuth");

const router = require("express").Router();

router.get("/", getAllProducts);
router.get("/category", getProductsCategories);
router.get("/:id", getSingleProduct);
router.post("/", isAuth, isAdmin, createProduct);
router.put("/:id", isAuth, isAdmin, updateProduct);
router.delete("/:id", isAuth, isAdmin, deleteProduct);

router.post("/reviews", isAuth, addorUpdateReview);
router.get("/reviews/:id", getReviews);
router.put("/reviews/:id", isAuth, deleteReview);


module.exports = router;
