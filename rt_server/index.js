import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import orderRouter from "./controllers/order.js";
import { PORT } from "./config/variables.js";

import "./config/db.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  transports: ["polling"],
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`💬 message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`❌ socket ${socket.id} disconnected`);
  });
});

export { io };

app.use(express.json());
app.use(cors());
app.use("/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(PORT, () => {
  console.log(`🚀 Server up and running on port ${PORT}`);
});
