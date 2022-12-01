const router = require("express").Router();
const profileController = require("../controllers/profileController");
const authLogin = require("../middlewares/auth");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.post("/get-profile", authLogin, profileController.getProfile);
router.post(
  "/edit-profile",
  authLogin,
  uploadSingle,
  profileController.editProflie
);

module.exports = router;
