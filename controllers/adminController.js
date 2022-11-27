const e = require("express");
const Category = require("../models/category");

module.exports = {
  viewDashboard: (req, res) => {
    res.render("admin/dashboard/view_dashboard.ejs");
  },

  viewCategory: async (req, res) => {
    const category = await Category.find();
    res.render("admin/category/view_category.ejs", { category });
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const hasil = await Category.create({ name });
      res.json({ msg: "success create data", data: hasil });
      res.redirect("/admin/category");
    } catch (error) {
      res.json({ msg: e.message });
      res.redirect("/admin/category");
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();

      res.json({ msg: "success update data" });
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      await category.delete();

      res.json({ msg: "success delete data" });
    } catch (e) {
      res.json({ msg: e.message });
    }
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
