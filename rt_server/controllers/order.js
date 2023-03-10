import express from "express";
import Order from "../models/order.js";
import { io } from "../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    const orders = await Order.find({});
    io.emit("order-added", orders);

    res.status(201).json(order);
  } catch (error) {
    res.json(error);
  }
});

export default router;
