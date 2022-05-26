const router = require("express").Router();

const { createOrder, getSingleOrder, orderPay } = require("../controllers/orderController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuth } = require("../middlewares/isAuth");


router.get("/:id", isAuth, getSingleOrder);
router.post("/", isAuth, createOrder);
router.put("/pay/:id", isAuth, orderPay);



module.exports = router;
