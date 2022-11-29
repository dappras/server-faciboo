const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const authLogin = require("../middlewares/auth");

router.post("/get-category", authLogin, categoryController.getCategory);
router.post(
  "/get-detail-category",
  authLogin,
  categoryController.getDetailCategory
);
router.post("/add-category", authLogin, categoryController.addCategory);
router.post("/edit-category", authLogin, categoryController.editCategory);
router.post("/delete-category", authLogin, categoryController.deleteCategory);

module.exports = router;
