require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
// mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// router admin
const adminRouter = require("./routes/admin");
const categoryRouter = require("./routes/category");
const bankRouter = require("./routes/bank");
const facilityRouter = require("./routes/facility");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const bookingRouter = require("./routes/booking");

var app = express();
var cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/category", categoryRouter);
app.use("/bank", bankRouter);
app.use("/facility", facilityRouter);
app.use("/user", userRouter);
app.use("/profile", profileRouter);
app.use("/booking", bookingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
