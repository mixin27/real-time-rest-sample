import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import OrderItem from "./OrderItem";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const response = await axios.get("http://localhost:5000/orders");
      const ordersData = response.data;
      setOrders(ordersData);
    };

    getOrders();
  }, []);

  useEffect(() => {
    const socket = io("ws://localhost:5000");

    socket.on("connection", () => {
      console.log("connected to server");
    });

    socket.on("order-added", (newOrders) => {
      setOrders(newOrders);
    });

    socket.on("message", (message) => {
      console.log(message);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }, []);

  return (
    <div className="orders-list">
      {orders &&
        orders.map((order) => {
          return (
            <div key={order._id}>
              <OrderItem order={order} />
            </div>
          );
        })}
    </div>
  );
};

export default OrderList;
