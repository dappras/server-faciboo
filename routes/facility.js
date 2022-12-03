const router = require("express").Router();
const authLogin = require("../middlewares/auth");
const facilityController = require("../controllers/facilityController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.post("/get-facility", authLogin, facilityController.getFacility);
router.post(
  "/get-detail-facility",
  authLogin,
  facilityController.getDetailFacility
);
router.post("/search-facility", authLogin, facilityController.searchFacility);
router.post(
  "/add-facility",
  authLogin,
  uploadMultiple,
  facilityController.addFacility
);
router.post(
  "/edit-facility",
  authLogin,
  uploadMultiple,
  facilityController.editFacility
);
router.post(
  "/delete-facility",
  authLogin,
  uploadMultiple,
  facilityController.deleteFacility
);

router.post("/get-my-facility", authLogin, facilityController.getMyFacility);
router.post(
  "/get-available-date",
  authLogin,
  facilityController.getAvailableDate
);

router.post(
  "/get-bank-facility",
  authLogin,
  facilityController.getBankFacility
);

module.exports = router;
