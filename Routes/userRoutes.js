const router = require("express").Router();
const validateToken = require("../MiddleWare/validateTokenHandler");
const {
    registerUser,
    loginUser,
    currentUser,
} = require("../Controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
