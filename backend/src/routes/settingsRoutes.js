const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { settingsValidator } = require('../validators/settingsValidator');

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, settingsValidator, validate, updateSettings);

module.exports = router;
