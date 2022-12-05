const express = require("express");
const User = require("../models/user");
const Booking = require("../models/booking");
const BookingDate = require("../models/booking-date");
const Bank = require("../models/bank");
const Image = require("../models/image");
const Facility = require("../models/facility");

module.exports = {
  booking: async (req, res) => {
    const {
      bookingDate,
      bookingYear,
      bookingMonth,
      bookingHour,
      total,
      facilityId,
    } = req.body;
    try {
      const user = await User.findOne({ token: req.token });
      const userFacility = await Facility.findOne({ _id: facilityId });
      let invoice = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 25; i++) {
        invoice += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      const booking = await Booking.create({
        bookingDate,
        bookingMonth,
        bookingYear,
        bookingHour,
        invoice,
        total,
        facilityId,
        userFacilityId: userFacility.userId,
        userId: user._id,
      });

      return res.json({
        success: true,
        msg: "success booking, please wait for validation",
        data: booking,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  cancelBooking: async (req, res) => {
    const { id } = req.body;
    try {
      const booking = await Booking.findOne({ _id: id });

      if (booking.status != 0) {
        return res.json({
          success: false,
          msg: "Hanya bisa dilakukan pada tahap sebelum pembayaran",
        });
      }

      await booking.remove();

      return res.json({
        success: true,
        msg: "Success cancel booking",
      });
    } catch (e) {
      return res.json({
        success: true,
        msg: e.message,
      });
    }
  },

  getUserBooking: async (req, res) => {
    const { status } = req.body;
    try {
      const user = await User.findOne({ token: req.token });
      const bookingAll = await Booking.find({ userId: user._id });

      let booking = [];

      if (status != undefined) {
        bookingAll.forEach((item) => {
          if (item.status == status) {
            booking.push(item);
          }
        });
      } else {
        booking = bookingAll;
      }

      const hasil = [];

      for (let i = 0; i < booking.length; i++) {
        const item = booking[i];

        const facility = await Facility.findOne({ _id: item.facilityId });

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

        const hasilLoop = { booking: item, facility: hasilItem };
        hasil.push(hasilLoop);
      }

      return res.json({
        success: true,
        msg: "success getting data!!",
        data: hasil,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getMerchantBooking: async (req, res) => {
    try {
      const user = await User.findOne({ token: req.token });
      const booking = await Booking.find({ userFacilityId: user._id });

      const hasil = [];

      for (let i = 0; i < booking.length; i++) {
        const element = booking[i];

        if (element.status === 1) {
          const facility = await Facility.findOne({ _id: element.facilityId });

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

          const hasilLoop = { booking: element, facility: hasilItem };
          hasil.push(hasilLoop);
        }
      }

      return res.json({
        success: true,
        msg: "success getting data!!",
        data: hasil,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getDetailUserBooking: async (req, res) => {
    const { bookingId } = req.body;
    try {
      const booking = await Booking.findOne({ _id: bookingId });
      const facility = await Facility.findOne({ _id: booking.facilityId });

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

      const hasil = {
        facility: hasilItem,
        booking: booking,
      };

      return res.json({
        success: true,
        msg: "success getting data!!",
        data: hasil,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  getDetailMerchantBooking: async (req, res) => {
    const { bookingId } = req.body;
    try {
      const booking = await Booking.findOne({ _id: bookingId });
      const facility = await Facility.findOne({ _id: booking.facilityId });
      const proofPayment = await Bank.findOne({ _id: booking.proofPaymentId });

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

      proofPayment.imageUrl = `http://103.23.199.203:3000/${proofPayment.imageUrl}`;

      const hasil = {
        facility: hasilItem,
        booking: booking,
        proofPayment: proofPayment,
      };

      return res.json({
        success: true,
        msg: "success getting data!!",
        data: hasil,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },

  confirmBooking: async (req, res) => {
    const { bookingId } = req.body;
    try {
      const booking = await Booking.findOne({ _id: bookingId });
      for (let i = 0; i < booking.bookingHour.length; i++) {
        const element = booking.bookingHour[i];

        const bookingDate = await BookingDate.create({
          bookingDate: booking.bookingDate,
          bookingMonth: booking.bookingMonth,
          bookingYear: booking.bookingYear,
          bookingHour: element,
          invoice: booking.invoice,
          facilityId: booking.facilityId,
          userId: booking.userId,
        });
      }

      booking.status = 2;
      booking.save();

      return res.json({
        success: true,
        msg: "success confirm payment",
        data: booking,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  },
};
