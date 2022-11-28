const router = require("express").Router();
const bankController = require("../controllers/bankController");
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");

router.post("/get-bank", bankController.getBank);
router.post("/get-detail-bank", bankController.getDetailBank);
router.post("/add-bank", uploadSingle, bankController.addBank);
router.post("/edit-bank", uploadSingle, bankController.editBank);
router.post("/delete-bank", uploadSingle, bankController.deleteBank);

module.exports = router;
