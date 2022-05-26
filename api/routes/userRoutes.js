const { getAllUsers, getSingleUser, updateUser, deleteUser, getUserStats } = require("../controllers/userController");
const { isAdmin } = require("../middlewares/isAdmin");
const { isAuth } = require("../middlewares/isAuth");

const router = require("express").Router();


router.get("/", isAuth, isAdmin, getAllUsers);
router.get("/:id", isAuth, isAdmin, getSingleUser);
router.put("/:id", isAuth, isAdmin, updateUser);
router.delete("/:id", isAuth, isAdmin, deleteUser);
router.get("/stats", isAuth, isAdmin, getUserStats);
 

module.exports = router;