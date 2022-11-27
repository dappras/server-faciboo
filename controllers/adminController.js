const e = require("express");
const Category = require("../models/category");
const Bank = require("../models/bank");
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

  getCategory: async (req, res) => {
    try {
      const category = await Category.find();
      res.json({ msg: "success getting data", data: category });
    } catch (e) {
      res.json({ msg: e.message });
    }
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

  getBank: async (req, res) => {
    try {
      const bank = await Bank.find();
      console.log(bank);
      if (bank === []) {
        res.json({ msg: "success getting data", data: [] });
      } else {
        res.json({ msg: "success getting data", data: bank });
      }
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  addBank: async (req, res) => {
    try {
      const { name, nameBank, nomorRekening } = req.body;
      const hasil = await Bank.create({
        nameBank,
        nomorRekening,
        name,
        imageUrl: `images/${req.file.filename}`,
      });
      res.json({ msg: "success create data", data: hasil });
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  editBank: async (req, res) => {
    const { id, name, nameBank, nomorRekening } = req.body;
    const bank = await Bank.findOne({ _id: id });
    try {
      if (req.file === undefined) {
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        await bank.save();
        res.json({ msg: "success update data" });
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        res.json({ msg: "success update data" });
      }
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      await bank.remove();

      res.json({ msg: "success delete data" });
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  viewFacility: (req, res) => {
    res.render("admin/facility/view_facility.ejs");
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking.ejs");
  },
};
