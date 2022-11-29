const express = require("express");
const Category = require("../models/category");
const Facility = require("../models/facility");

module.exports = {
  getCategory: async (req, res) => {
    try {
      const category = await Category.find();
      if (category === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: category,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  getDetailCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      if (category === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: category,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const hasil = await Category.create({ name });
      return res.json({
        success: true,
        msg: "success create data",
        data: hasil,
      });
    } catch (error) {
      return res.json({ success: false, msg: e.message });
    }
  },

  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const category = await Category.findOne({ _id: id });
      category.name = name;
      await category.save();

      return res.json({ success: true, msg: "success update data" });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      await category.delete();

      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  facilityByCategory: async (req, res) => {
    const { id } = req.body;
    try {
      const category = await Category.findOne({ _id: id });
      const arrFacility = [];

      for (let i = 0; i < category.facilityId.length; i++) {
        let facility = await Facility.findOne({ _id: category.facilityId[i] });
        arrFacility.push(facility);
      }

      return res.json({
        success: true,
        msg: "success getting data",
        data: arrFacility,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },
};
