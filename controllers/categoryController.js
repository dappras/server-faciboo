const express = require("express");
const Category = require("../models/category");

module.exports = {
  getCategory: async (req, res) => {
    try {
      const category = await Category.find();
      if (category === []) {
        res.json({ msg: "success getting data", data: [] });
      } else {
        res.json({ msg: "success getting data", data: category });
      }
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  getDetailCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      if (category === []) {
        res.json({ msg: "success getting data", data: [] });
      } else {
        res.json({ msg: "success getting data", data: category });
      }
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
};
