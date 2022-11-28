const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.post("/get-category", categoryController.getCategory);
router.post("/add-category", categoryController.addCategory);
router.post("/edit-category", categoryController.editCategory);
router.post("/delete-category", categoryController.deleteCategory);

module.exports = router;
