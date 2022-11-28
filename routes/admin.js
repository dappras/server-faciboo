const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.get("/bank", adminController.viewBank);
router.get("/facility", adminController.viewFacility);
router.get("/booking", adminController.viewBooking);

router.post("/get-category", adminController.getCategory);
router.post("/add-category", adminController.addCategory);
router.post("/edit-category", adminController.editCategory);
router.post("/delete-category", adminController.deleteCategory);

router.post("/get-bank", adminController.getBank);
router.post("/add-bank", uploadSingle, adminController.addBank);
router.post("/edit-bank", uploadSingle, adminController.editBank);
router.post("/delete-bank", uploadSingle, adminController.deleteBank);

router.post("/add-facility", uploadMultiple, adminController.addFacility);
router.post("/edit-facility", uploadMultiple, adminController.editFacility);
router.post("/delete-facility", uploadMultiple, adminController.deleteFacility);

module.exports = router;
