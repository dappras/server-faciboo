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

  getFacility: async (req, res) => {
    try {
      const facility = await Facility.find();
      if (facility === []) {
        res.json({ msg: "success getting data", data: [] });
      } else {
        res.json({ msg: "success getting data", data: facility });
      }
    } catch (e) {
      res.json({ msg: e.message });
    }
  },

  addFacility: async (req, res) => {
    try {
      const { name, address, description, price, urlMaps, categoryId } =
        req.body;
      if (req.files.length > 0) {
        const category = await Category.findOne({ _id: categoryId });
        const newFacility = {
          categoryId: category._id,
          name,
          address,
          description,
          price,
          urlMaps,
        };
        const facility = await Facility.create(newFacility);

        category.facilityId.push({ _id: facility._id });
        await category.save();

        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          facility.imageId.push({ _id: imageSave._id });
          await facility.save();
        }

        res.json({
          msg: "success create data",
          data: facility,
        });
      }
    } catch (e) {
      res.json({
        msg: e.message,
      });
    }
  },

  editFacility: async (req, res) => {
    try {
      const { id, name, address, description, price, urlMaps, categoryId } =
        req.body;

      const facility = await Facility.findOne({ _id: id });

      if (req.files.length > 0) {
        for (let i = 0; i < facility.imageId.length; i++) {
          const imageSave = await Image.findOne({
            _id: facility.imageId[i]._id,
          });
          await fs.unlink(path.join(`public/${imageSave.imageUrl}`));
          imageSave.imageUrl = `images/${req.files[i].filename}`;
          await imageSave.save();
        }
        facility.name = name;
        facility.address = address;
        facility.description = description;
        facility.price = price;
        facility.urlMaps = urlMaps;

        if (facility.categoryId === categoryId) {
          facility.categoryId = categoryId;
        } else {
          const category = await Category.findOne({ _id: facility.categoryId });
          await Category.updateMany(
            {},
            { $pull: { facilityId: { $in: [id] } } }
          );
          await category.save();

          const categoryNew = await Category.findOne({ _id: categoryId });
          categoryNew.facilityId.push({ _id: id });
          await categoryNew.save();

          facility.categoryId = categoryId;
        }

        await facility.save();

        res.json({
          msg: "success update data",
          data: facility,
        });
      } else {
        facility.name = name;
        facility.address = address;
        facility.description = description;
        facility.price = price;
        facility.urlMaps = urlMaps;
        facility.categoryId = categoryId;

        if (facility.categoryId === categoryId) {
          facility.categoryId = categoryId;
        } else {
          const category = await Category.findOne({ _id: facility.categoryId });
          await Category.updateMany(
            {},
            { $pull: { facilityId: { $in: [id] } } }
          );
          await category.save();

          const categoryNew = await Category.findOne({ _id: categoryId });
          categoryNew.facilityId.push({ _id: id });
          await categoryNew.save();

          facility.categoryId = categoryId;
        }

        await facility.save();

        res.json({
          msg: "success update data",
          data: facility,
        });
      }
    } catch (e) {
      res.json({
        msg: e.message,
      });
    }
  },

  deleteFacility: async (req, res) => {
    try {
      const { id } = req.body;
      const facility = await Facility.findOne({ _id: id });

      for (let i = 0; i < facility.imageId.length; i++) {
        await Image.findOne({ _id: facility.imageId[i]._id })
          .then((image) => {
            fs.unlink(path.join(`public/${image.imageUrl}`));
            image.remove();
          })
          .catch((e) => {
            res.json({
              msg: e.message,
            });
          });
      }
      const category = await Category.findOne({ _id: facility.categoryId });
      await Category.updateMany({}, { $pull: { facilityId: { $in: [id] } } });
      await category.save();
      await facility.remove();
      res.json({ msg: "success delete data" });
    } catch (e) {
      res.json({
        msg: e.message,
      });
    }
  },

  viewBooking: (req, res) => {
    res.render("admin/booking/view_booking.ejs");
  },
};
