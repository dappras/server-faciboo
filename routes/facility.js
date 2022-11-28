const router = require("express").Router();
const facilityController = require("../controllers/facilityController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.post("/get-facility", facilityController.getFacility);
router.post("/add-facility", uploadMultiple, facilityController.addFacility);
router.post("/edit-facility", uploadMultiple, facilityController.editFacility);
router.post(
  "/delete-facility",
  uploadMultiple,
  facilityController.deleteFacility
);

module.exports = router;
