const Chat = require("../models/chat");

exports.sendMessage = async (data, io, userSocketMap) => {
  const { senderId, receiverId, message, timestamp } = data;

  try {
    let chatRecord = await Chat.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    if (!chatRecord) {
      chatRecord = new Chat({ senderId, receiverId, messages: [] });
    }

    chatRecord.messages.push({ senderId, message, timestamp });
    await chatRecord.save();

    const senderSocket = userSocketMap[senderId];
    const receiverSocket = userSocketMap[receiverId];

    if (senderSocket) {
      console.log(`Sending message to sender ${senderId}`);
      io.to(senderSocket).emit("receive_message", {
        senderId,
        receiverId,
        message,
        timestamp,
      });
    }
    if (receiverSocket) {
      console.log(`Sending message to receiver ${receiverId}`);
      io.to(receiverSocket).emit("receive_message", {
        senderId,
        receiverId,
        message,
        timestamp,
      });
    }
  } catch (e) {
    console.error(`Error sending message: ${e}`);
  }
};

exports.checkExistChat = async (req, res) => {
  const { id, receiverId } = req.query;

  try {
    const findExistChat = await Chat.findOne({
      $or: [
        { senderId: id, receiverId: receiverId },
        { senderId: receiverId, receiverId: id },
      ],
    });

    if (!findExistChat) {
      return res.status(200).send({ exists: false });
    }

    const findChat = await Chat.findById(findExistChat._id);
    if (!findChat) return res.status(400).json({ error: "Chat not found" });

    return res.status(200).send({
      exists: true,
      chatId: findExistChat._id,
      messages: findChat.messages,
    });
  } catch (e) {
    return res.status(500).send({ error: "Server error" });
  }
};

exports.getChats = async (req, res) => {
  const { id, role } = req.params;

  const findChat = await Chat.find({
    $or: [{ senderId: id }, { receiverId: id }],
  });

  const populatedChats = await Promise.all(
    findChat.map(async (chat) => {
      const isSender = chat.senderId.toString() === id;

      return chat.populate({
        path: isSender ? "receiverId" : "senderId",
        model: role === "customer" ? "Cleaner" : "User",
        select: "firstName lastName profilePicture",
        populate:
          role === "customer"
            ? {
                path: "userId",
                model: "User",
                select: "firstName lastName profilePicture",
              }
            : undefined,
      });
    })
  );

  try {
    return res.status(200).send(populatedChats);
  } catch (e) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
