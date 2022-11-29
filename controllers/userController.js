require("dotenv").config();
const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  userRegister: async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
      const checkEmail = await User.findOne({ email: email });
      const checkPhone = await User.findOne({ phoneNumber: phoneNumber });
      if (checkEmail) {
        return res.json({
          success: false,
          msg: "Email sudah digunakan!!",
        });
      }

      if (checkPhone) {
        return res.json({
          success: false,
          msg: "Nomor handphone sudah digunakan!!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

      const user = await User.create({
        name,
        email,
        password: hashPassword,
        phoneNumber,
        token,
      });
      return res.json({
        success: true,
        msg: "success create data",
        data: user,
      });
    } catch (e) {
      return res.json({ msg: e.message });
    }
  },

  userLogin: async (req, res) => {
    const { phoneNumber, password } = req.body;
    try {
      const user = await User.findOne({ phoneNumber: phoneNumber });
      if (!user) {
        return res.json({
          success: false,
          msg: "Nomor Handphone Anda Salah!!",
        });
      }

      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        return res.json({
          success: false,
          msg: "Password Anda Salah!!",
        });
      }

      return res.json({
        success: true,
        msg: "Anda Berhasil Login!!",
        token: user.token,
      });
    } catch (error) {
      return res.json({ msg: e.message });
    }
  },
};
