const { Server } = require("socket.io");
const { sendMessage } = require("./controllers/chatController");

let userSocketMap = {};

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("user_connected", (userId) => {
      userSocketMap[userId] = socket.id;
      console.log(`User ${userId} is mapped to socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      const userId = Object.keys(userSocketMap).find(
        (key) => userSocketMap[key] === socket.id
      );
      if (userId) {
        delete userSocketMap[userId];
      }
      console.log(`User disconnected: ${socket.id}`);
    });

    socket.on("send_message", async (data) => {
      sendMessage(data, io, userSocketMap);
    });
  });

  return io;
};

module.exports = setupSocket;
