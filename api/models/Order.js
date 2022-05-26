const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, default: 0 },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        // productId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Product",
        //   required: true,
        // },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
      // location: {
      //   lat: { type: Number },
      //   lng: { type: Number },
      //   address: { type: String },
      //   name: { type: String },
      //   vicinity: { type: String },
      //   googleAddressId: { type: String },
      // },
    },

    paymentMethod: { type: String, required: true, default: "Paypal" },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestaps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
