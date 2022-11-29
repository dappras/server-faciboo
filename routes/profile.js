const router = require("express").Router();
const profileController = require("../controllers/profileController");
const authLogin = require("../middlewares/auth");

router.post("/get-profile", authLogin, profileController.getProfile);
router.post("/edit-profile", authLogin, profileController.editProflie);

module.exports = router;
