const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");


router.get("/", mainController.getHome);
router.get("/admin_home", mainController.getAdminHome);
router.post("/add", mainController.addWord);
router.get("/edit/:id", mainController.getEditWord);
router.post("/edit/:id", mainController.editWord);
router.post("/delete/:id", mainController.deleteWord);
router.get('/about', mainController.getAbout);

module.exports = router;
