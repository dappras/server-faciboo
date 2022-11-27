const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { upload } = require("../middlewares/multer");

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
router.post("/add-bank", upload, adminController.addBank);
router.post("/edit-bank", upload, adminController.editBank);
router.post("/delete-bank", upload, adminController.deleteBank);

module.exports = router;
