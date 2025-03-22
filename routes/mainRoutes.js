const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const authController = require("../controllers/authController");
const { ensureAuth } = require("../middleware/auth");

router.get("/", mainController.getHome);
router.get("/about", mainController.getAbout);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

router.get("/admin_home", ensureAuth, mainController.getAdminHome);
router.post("/add", ensureAuth, mainController.addWord);
router.get("/edit/:id", ensureAuth, mainController.getEditWord);
router.post("/edit/:id", ensureAuth, mainController.editWord);
router.post("/delete/:id", ensureAuth, mainController.deleteWord);

module.exports = router;
