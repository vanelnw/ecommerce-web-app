const router = require("express").Router();

const {registerUser, authUser}  = require("../controllers/userController")

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;
