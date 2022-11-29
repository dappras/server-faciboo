const router = require("express").Router();
const authLogin = require("../middlewares/auth");
const bankController = require("../controllers/bankController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.post("/get-bank", authLogin, bankController.getBank);
router.post("/get-detail-bank", authLogin, bankController.getDetailBank);
router.post("/add-bank", authLogin, uploadSingle, bankController.addBank);
router.post("/edit-bank", authLogin, uploadSingle, bankController.editBank);
router.post("/delete-bank", authLogin, uploadSingle, bankController.deleteBank);

module.exports = router;
