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
    const { name, password } = req.body;
    try {
      const token = req.token;
      const profile = await User.findOne({ token: token });

      if (password === undefined) {
        profile.name = name;
        profile.token = token;
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        profile.name = name;
        profile.password = hashPassword;
        profile.token = token;
      }

      await profile.save();

      return res.json({
        success: true,
        msg: "success update data",
        data: profile,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },
};
