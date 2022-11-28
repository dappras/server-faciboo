const e = require("express");
const Category = require("../models/category");
const Bank = require("../models/bank");
const Facility = require("../models/facility");
const Image = require("../models/image");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard.ejs");
  },

  viewCategory: async (req, res) => {
    const category = await Category.find();
    res.render("admin/category/view_category.ejs", { category });
  },

  viewBank: (req, res) => {
    res.render("admin/bank/view_bank.ejs");
  },

  viewFacility: (req, res) => {
    res.render("admin/facility/view_facility.ejs");
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking.ejs");
  },
};
