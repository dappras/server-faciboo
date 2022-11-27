const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);
router.get("/bank", adminController.viewBank);
router.get("/facility", adminController.viewFacility);
router.get("/booking", adminController.viewBooking);

router.post("/add-category", adminController.addCategory);

module.exports = router;
