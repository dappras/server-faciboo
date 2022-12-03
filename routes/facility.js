const router = require("express").Router();
const authLogin = require("../middlewares/auth");
const facilityController = require("../controllers/facilityController");
const { uploadMultipleImage } = require("../middlewares/base64");

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
  uploadMultipleImage,
  facilityController.addFacility
);
router.post(
  "/edit-facility",
  authLogin,
  uploadMultipleImage,
  facilityController.editFacility
);
router.post(
  "/delete-facility",
  authLogin,
  uploadMultipleImage,
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
