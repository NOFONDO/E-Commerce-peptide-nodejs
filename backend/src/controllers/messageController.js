const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Message = require('../models/Message');

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const newMessage = await Message.create({ name, email, phone, subject, message });
  res.status(201).json({
    success: true,
    message: 'Your message has been sent. We will get back to you shortly.',
    data: newMessage,
  });
});

const getMessages = asyncHandler(async (req, res) => {
  const { isRead, isReplied, page = 1, limit = 20 } = req.query;
  const query = {};
  if (isRead !== undefined) query.isRead = isRead === 'true';
  if (isReplied !== undefined) query.isReplied = isReplied === 'true';

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.min(Math.max(Number(limit), 1), 100);
  const skip = (pageNum - 1) * limitNum;

  const [messages, total, unreadCount] = await Promise.all([
    Message.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Message.countDocuments(query),
    Message.countDocuments({ isRead: false }),
  ]);

  res.status(200).json({
    success: true,
    data: messages,
    unreadCount,
    pagination: { total, page: pageNum, limit: limitNum, totalPages: Math.ceil(total / limitNum) || 1 },
  });
});

const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }
  if (!message.isRead) {
    message.isRead = true;
    await message.save();
  }
  res.status(200).json({ success: true, data: message });
});

const markAsReplied = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }
  message.isReplied = true;
  message.isRead = true;
  await message.save();
  res.status(200).json({ success: true, message: 'Message marked as replied', data: message });
});

const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }
  await message.deleteOne();
  res.status(200).json({ success: true, message: 'Message deleted successfully' });
});

module.exports = { createMessage, getMessages, getMessageById, markAsReplied, deleteMessage };
