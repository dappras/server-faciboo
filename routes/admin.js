const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.get("/bank", adminController.viewBank);
router.get("/facility", adminController.viewFacility);
router.get("/booking", adminController.viewBooking);

router.post("/add-category", adminController.addCategory);
router.post("/edit-category", adminController.editCategory);
router.post("/delete-category", adminController.deleteCategory);

module.exports = router;
