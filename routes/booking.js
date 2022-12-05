const router = require("express").Router();
const authLogin = require("../middlewares/auth");
const bookingController = require("../controllers/bookingController");

router.post("/booking", authLogin, bookingController.booking);
router.post("/cancel-booking", authLogin, bookingController.cancelBooking);
router.post("/get-user-booking", authLogin, bookingController.getUserBooking);
router.post(
  "/get-merchant-booking",
  authLogin,
  bookingController.getMerchantBooking
);
router.post(
  "/get-detail-user-booking",
  authLogin,
  bookingController.getDetailUserBooking
);
router.post(
  "/get-detail-merchant-booking",
  authLogin,
  bookingController.getDetailMerchantBooking
);
router.post("/confirm-booking", authLogin, bookingController.confirmBooking);

module.exports = router;
