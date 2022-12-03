const router = require("express").Router();
const profileController = require("../controllers/profileController");
const authLogin = require("../middlewares/auth");
const { uploadImage } = require("../middlewares/base64");

router.post("/get-profile", authLogin, profileController.getProfile);
router.post(
  "/edit-profile",
  authLogin,
  uploadImage,
  profileController.editProflie
);

module.exports = router;
