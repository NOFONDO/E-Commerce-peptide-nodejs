const express = require('express');
const {
  createMessage,
  getMessages,
  getMessageById,
  markAsReplied,
  deleteMessage,
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { messageValidator } = require('../validators/messageValidator');
const { contactLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', contactLimiter, messageValidator, validate, createMessage);
router.get('/', protect, getMessages);
router.get('/:id', protect, getMessageById);
router.patch('/:id/replied', protect, markAsReplied);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
