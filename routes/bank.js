const router = require("express").Router();
const authLogin = require("../middlewares/auth");
const bankController = require("../controllers/bankController");
const { uploadImage } = require("../middlewares/base64");

router.post("/get-bank", authLogin, bankController.getBank);
router.post("/get-detail-bank", authLogin, bankController.getDetailBank);
router.post("/add-bank", authLogin, uploadImage, bankController.addBank);
router.post("/edit-bank", authLogin, uploadImage, bankController.editBank);
router.post("/delete-bank", authLogin, uploadImage, bankController.deleteBank);

module.exports = router;
