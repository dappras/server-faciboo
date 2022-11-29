const express = require("express");
const Bank = require("../models/bank");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  getBank: async (req, res) => {
    try {
      const bank = await Bank.find();
      console.log(bank);
      if (bank === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: bank,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  getDetailBank: async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      if (bank === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: bank,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
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
      return res.json({
        success: true,
        msg: "success create data",
        data: hasil,
      });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
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
        return res.json({ success: true, msg: "success update data" });
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.imageUrl = `images/${req.file.filename}`;
        await bank.save();
        return res.json({ success: true, msg: "success update data" });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      await bank.remove();

      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },
};
