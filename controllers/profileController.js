require("dotenv").config();
const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const token = req.token;
      const profile = await User.findOne({ token: token });
      profile.imageUrl = `http://103.23.199.203:3000/${profile.imageUrl}`;
      return res.json({
        success: true,
        msg: "success get data",
        data: profile,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  editProflie: async (req, res) => {
    const { name, password, nameBank, nomorRekening, nameAccountBank } =
      req.body;
    try {
      const token = req.token;
      const profile = await User.findOne({ token: token });

      if (req.file === undefined) {
        if (password === undefined) {
          profile.name = name;
          profile.token = token;
          if (
            nameBank != undefined ||
            nomorRekening != undefined ||
            nameAccountBank != undefined
          ) {
            profile.nameBank = nameBank;
            profile.nomorRekening = nomorRekening;
            profile.nameAccountBank = nameAccountBank;
          }
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          profile.name = name;
          profile.password = hashPassword;
          profile.token = token;
          if (
            nameBank != undefined ||
            nomorRekening != undefined ||
            nameAccountBank != undefined
          ) {
            profile.nameBank = nameBank;
            profile.nomorRekening = nomorRekening;
            profile.nameAccountBank = nameAccountBank;
          }
        }

        await profile.save();

        return res.json({
          success: true,
          msg: "success update data",
          data: profile,
        });
      } else {
        if (
          profile.imageUrl == undefined ||
          profile.imageUrl == null ||
          profile.imageUrl == ""
        ) {
          profile.imageUrl = `images/${req.file.filename}`;
        } else {
          await fs.unlink(path.join(`public/${profile.imageUrl}`));
          profile.imageUrl = `images/${req.file.filename}`;
        }
        if (password === undefined) {
          profile.name = name;
          profile.token = token;
          if (
            nameBank != undefined ||
            nomorRekening != undefined ||
            nameAccountBank != undefined
          ) {
            profile.nameBank = nameBank;
            profile.nomorRekening = nomorRekening;
            profile.nameAccountBank = nameAccountBank;
          }
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);

          profile.name = name;
          profile.password = hashPassword;
          profile.token = token;
          if (
            nameBank != undefined ||
            nomorRekening != undefined ||
            nameAccountBank != undefined
          ) {
            profile.nameBank = nameBank;
            profile.nomorRekening = nomorRekening;
            profile.nameAccountBank = nameAccountBank;
          }
        }

        await profile.save();

        return res.json({
          success: true,
          msg: "success update data",
          data: profile,
        });
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },
};
