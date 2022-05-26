const asyncHandler = require("express-async-handler");

const Order = require("../models/Order");

//create order
const createOrder = asyncHandler(async (req, res) => {
     const {
       orderItems,
       shippingAddress,
       paymentMthod,
       itemsPrice,
       taxPrice,
        shippingPrice,
       totalPrice,
     } = req.body;
    try {
        const order = await Order.create({
          userId: req.user._id,
          orderItems,
          shippingAddress,
          paymentMthod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
}
)

//get all orders
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.fing().populate('userId');
        res.status(200).json(orders);
    } catch (error) {
       res.status(500).json(error); 
    }
})

//get single  oorder
const getSingleOrder = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(orderItems);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
})

//get my orders
const getMyOrders = asyncHandler(async (req, res) => {
    try {
         const orders = await Order.find({ userId: req.user._id });
         res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
})

//payorder
const orderPay = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order Not Found");
    }
});

//DELETE ORDER
const deleteOrder = asyncHandler(async (reeq, res) => {
    try {
        await Order.findByIdAndRemove(req.params.id);
        res.status(200).json("order deleted")
    } catch (error) {
         res.status(500).json(error);
    }
})

//get orders summary
const ordersSummary = asyncHandler(async (req, res) => {
    
})







module.exports = { createOrder, getSingleOrder, orderPay };
