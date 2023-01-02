
const express = require('express');
const router = express.Router();

const tinyUrlController = require('../controllers/tinyUrlController');

router.post('/create', tinyUrlController.createTinyUrl);

module.exports = router;