const express = require("express");
const Category = require("../models/category");
const User = require("../models/user");
const Facility = require("../models/facility");
const Image = require("../models/image");
const BookingDate = require("../models/booking-date");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  getFacility: async (req, res) => {
    try {
      const facility = await Facility.find();
      if (facility === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        hasil = [];
        for (let i = 0; i < facility.length; i++) {
          const facilityItem = facility[i];
          const hasilItem = {
            _id: facilityItem._id,
            name: facilityItem.name,
            address: facilityItem.address,
            description: facilityItem.description,
            price: facilityItem.price,
            urlMaps: facilityItem.urlMaps,
            hourAvailable: facilityItem.hourAvailable,
            categoryId: facilityItem.categoryId,
            image: [],
            userId: facilityItem.userId,
          };
          for (let j = 0; j < facilityItem.imageId.length; j++) {
            const image = facilityItem.imageId[j];
            const imageFacility = await Image.findOne({ _id: image });

            hasilItem.image.push(
              `http://103.23.199.203:3000/${imageFacility.imageUrl}`
            );
          }

          hasil.push(hasilItem);
        }
        return res.json({
          success: true,
          msg: "success getting data",
          data: hasil,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  getDetailFacility: async (req, res) => {
    try {
      const { id } = req.body;
      const facility = await Facility.findOne({ _id: id });
      if (facility === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        const hasilItem = {
          _id: facility._id,
          name: facility.name,
          address: facility.address,
          description: facility.description,
          price: facility.price,
          urlMaps: facility.urlMaps,
          hourAvailable: facility.hourAvailable,
          categoryId: facility.categoryId,
          image: [],
          userId: facility.userId,
        };
        for (let j = 0; j < facility.imageId.length; j++) {
          const image = facility.imageId[j];
          const imageFacility = await Image.findOne({ _id: image });

          hasilItem.image.push(
            `http://103.23.199.203:3000/${imageFacility.imageUrl}`
          );
        }

        return res.json({
          success: true,
          msg: "success getting data",
          data: hasilItem,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  },

  searchFacility: async (req, res) => {
    const { search } = req.body;

    try {
      const facility = await Facility.find({
        $or: [{ name: { $regex: search } }],
      });

      return res.json({
        success: true,
        msg: "success getting data",
        data: facility,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  addFacility: async (req, res) => {
    try {
      const {
        name,
        address,
        description,
        price,
        urlMaps,
        categoryId,
        hourAvailable,
      } = req.body;

      const user = await User.findOne({ token: req.token });

      if (req.fileName == undefined) {
        return res.json({
          success: false,
          msg: "Please upload image",
        });
      }

      if (
        (user.nameBank == null ||
          user.nameBank == undefined ||
          user.nameBank == "") &&
        (user.nomorRekening == null ||
          user.nomorRekening == undefined ||
          user.nomorRekening == "") &&
        (user.nameAccountBank == null ||
          user.nameAccountBank == undefined ||
          user.nameAccountBank == "")
      ) {
        return res.json({
          success: false,
          msg: "Silahkan lengkapi informasi bank user anda",
        });
      } else {
        if (req.fileName.length > 0) {
          const category = await Category.findOne({ _id: categoryId });
          const newFacility = {
            categoryId: category._id,
            name,
            address,
            description,
            price,
            urlMaps,
            hourAvailable,
            userId: user._id,
          };
          const facility = await Facility.create(newFacility);

          category.facilityId.push({ _id: facility._id });
          await category.save();

          for (let i = 0; i < req.fileName.length; i++) {
            const imageSave = await Image.create({
              imageUrl: `images/${req.fileName[i]}`,
            });
            facility.imageId.push({ _id: imageSave._id });
            await facility.save();
          }

          return res.json({
            success: true,
            msg: "success create data",
            data: facility,
          });
        }
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  editFacility: async (req, res) => {
    try {
      const {
        id,
        name,
        address,
        description,
        price,
        urlMaps,
        hourAvailable,
        categoryId,
      } = req.body;

      const facility = await Facility.findOne({ _id: id });

      if (req.fileName != undefined) {
        for (let i = 0; i < facility.imageId.length; i++) {
          const imageSave = await Image.findOne({
            _id: facility.imageId[i]._id,
          });
          await fs.unlink(path.join(`public/${imageSave.imageUrl}`));
          imageSave.imageUrl = `images/${req.fileName[i]}`;
          await imageSave.save();
        }
        facility.name = name;
        facility.address = address;
        facility.description = description;
        facility.price = price;
        facility.urlMaps = urlMaps;
        facility.hourAvailable = hourAvailable;

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

        return res.json({
          success: true,
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

        return res.json({
          success: true,
          msg: "success update data",
          data: facility,
        });
      }
    } catch (e) {
      return res.json({
        success: false,
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
            return res.json({
              success: false,
              msg: e.message,
            });
          });
      }
      const category = await Category.findOne({ _id: facility.categoryId });
      await Category.updateMany({}, { $pull: { facilityId: { $in: [id] } } });
      await category.save();
      await facility.remove();
      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getMyFacility: async (req, res) => {
    try {
      const user = await User.findOne({ token: req.token });

      const facility = await Facility.find({ userId: user._id });

      if (facility == []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        hasil = [];
        for (let i = 0; i < facility.length; i++) {
          const facilityItem = facility[i];
          const hasilItem = {
            _id: facilityItem._id,
            name: facilityItem.name,
            address: facilityItem.address,
            description: facilityItem.description,
            price: facilityItem.price,
            urlMaps: facilityItem.urlMaps,
            hourAvailable: facilityItem.hourAvailable,
            categoryId: facilityItem.categoryId,
            image: [],
            userId: facilityItem.userId,
          };
          for (let j = 0; j < facilityItem.imageId.length; j++) {
            const image = facilityItem.imageId[j];
            const imageFacility = await Image.findOne({ _id: image });

            hasilItem.image.push(
              `http://103.23.199.203:3000/${imageFacility.imageUrl}`
            );
          }

          hasil.push(hasilItem);
        }
        return res.json({
          success: true,
          msg: "success getting data",
          data: hasil,
        });
      }

      // return res.json({
      //   success: true,
      //   msg: "success getting data!!",
      //   data: facility,
      // });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getAvailableDate: async (req, res) => {
    const { id } = req.body;
    try {
      const facility = await Facility.findOne({ _id: id });
      const date = await BookingDate.find({ facilityId: facility._id });

      if (date != []) {
        let now = new Date();
        let tahun = now.getFullYear();
        const hasil = [];
        for (let i = 0; i < 7; i++) {
          let waktu = new Date(now);
          waktu.setDate(waktu.getDate() + i + 1);
          let tanggal = waktu.getDate();
          let bulan = waktu.getMonth() + 1;
          const data = {
            date: tanggal,
            month: bulan,
            year: tahun,
            availableHour: [],
          };
          for (let j = 0; j < facility.hourAvailable.length; j++) {
            let element = facility.hourAvailable[j];
            let ada = false;
            for (let k = 0; k < date.length; k++) {
              const item = date[k];
              if (
                item.bookingHour === element &&
                item.bookingDate === tanggal &&
                item.bookingMonth === bulan &&
                item.bookingYear === tahun
              ) {
                ada = true;
              }
            }
            if (ada === false) {
              data.availableHour.push(element);
            }
          }
          hasil.push(data);
        }

        return res.json({
          success: true,
          data: hasil,
        });
      } else {
        let now = new Date();
        let tahun = now.getFullYear();
        const hasil = [];
        for (let i = 0; i < 7; i++) {
          let waktu = new Date(now);
          waktu.setDate(waktu.getDate() + i);
          let tanggal = waktu.getDate();
          let bulan = waktu.getMonth() + 1;
          const data = {
            date: tanggal,
            month: bulan,
            year: tahun,
            availableHour: facility.hourAvailable,
          };
          hasil.push(data);
        }

        return res.json({
          success: true,
          data: hasil,
        });
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getBankFacility: async (req, res) => {
    const { facilityId } = req.body;
    try {
      const facility = await Facility.findOne({ _id: facilityId });
      const user = await User.findOne({ _id: facility.userId });

      if (
        (user.nameBank == null ||
          user.nameBank == undefined ||
          user.nameBank == "") &&
        (user.nomorRekening == null ||
          user.nomorRekening == undefined ||
          user.nomorRekening == "") &&
        (user.nameAccountBank == null ||
          user.nameAccountBank == undefined ||
          user.nameAccountBank == "")
      ) {
        return res.json({
          success: false,
          msg: "Pemilik fasilitas belum melengkapi informasi akun",
        });
      } else {
        const hasil = {
          nameBank: user.nameBank,
          nomorRekening: user.nomorRekening,
          nameAccountBank: user.nameAccountBank,
        };

        return res.json({
          success: true,
          msg: "Success getting data !!",
          data: hasil,
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
