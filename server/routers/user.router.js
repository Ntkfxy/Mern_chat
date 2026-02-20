const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protectedRoute } = require("../middlewares/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logOut);
router.put("/update-profile", protectedRoute, userController.updateProfile);
router.get("/check", protectedRoute, userController.checkAuth);
module.exports = router;
